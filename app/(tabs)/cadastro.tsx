import { Button, ButtonText } from '@/components/ui/button'
import {
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
} from '@/components/ui/form-control'
import { Input, InputField, InputSlot } from '@/components/ui/input'
import {
  Toast,
  ToastDescription,
  ToastTitle,
  useToast,
} from '@/components/ui/toast'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import DateTimePicker from '@react-native-community/datetimepicker'
import { Picker } from '@react-native-picker/picker'
import { useFocusEffect } from '@react-navigation/native'
import { useCallback, useState } from 'react'
import { KeyboardAvoidingView, ScrollView, View } from 'react-native'
import CurrencyInput from 'react-native-currency-input'
import { SafeAreaView } from 'react-native-safe-area-context'

type RegisterT = {
  title: string
  value: number | null
  date: Date
  category: string
}

const initialStateForm: RegisterT = {
  title: '',
  value: 0,
  date: new Date(),
  category: '',
}

const initialStateErrors = {
  title: false,
  value: false,
  date: false,
  category: false,
}

const Cadastro = () => {
  const [form, setForm] = useState<RegisterT>(initialStateForm)
  const [error, setError] = useState(initialStateErrors)
  const [show, setShow] = useState(false)

  const toast = useToast()

  const categoriesOptions = [
    { label: 'Renda', value: 'renda' },
    { label: 'Educação', value: 'educacao' },
    { label: 'Alimentação', value: 'alimentacao' },
    { label: 'Contas', value: 'contas' },
    { label: 'Saúde', value: 'saude' },
    { label: 'Viagem', value: 'viagem' },
    { label: 'Outros', value: 'outros' },
  ]

  function handleValidate(field: string, value: any) {
    setError((prev) => ({ ...prev, [field]: false }))

    if (field === 'value') {
      if (value < 0.01) {
        setError((prev) => ({ ...prev, [field]: true }))
      }
    } else if (field === 'date') {
      if (!value) {
        setError((prev) => ({ ...prev, [field]: true }))
      }
    } else {
      if (value.trim() === '' || value === null || value < 1) {
        setError((prev) => ({ ...prev, [field]: true }))
      }
    }
  }

  function handleDateChange(event: any, selectedDate: Date | undefined) {
    const currentDate = selectedDate || form.date
    setShow(false)
    setForm({ ...form, date: currentDate })
  }

  async function setData(form: RegisterT) {
    const data = await AsyncStorage.getItem('data')
    const parsedData = data ? JSON.parse(data) : []
    const newData = [...parsedData, form]
    try {
      await AsyncStorage.setItem('data', JSON.stringify(newData))
    } catch (error) {
      console.log(error)
    }
  }

  function handleSelectChange(value: string) {
    setForm({ ...form, category: value })
    handleValidate('category', value)
  }

  const showSuccessToast = () => {
    toast.show({
      placement: 'top',
      duration: 3000,
      render: () => {
        return (
          <SafeAreaView>
            <Toast action="success" variant="solid" className="w-full p-4">
              <ToastTitle>Sucesso!</ToastTitle>
              <ToastDescription>
                Transação adicionada com sucesso.
              </ToastDescription>
            </Toast>
          </SafeAreaView>
        )
      },
    })
  }

  function handleSubmit() {
    handleValidate('title', form.title)
    handleValidate('value', form.value)
    handleValidate('date', form.date)
    handleValidate('category', form.category)

    if (error.title || error.value || error.date || error.category) {
      return
    }

    if (form.title && form.value && form.date && form.category) {
      setData(form)
      showSuccessToast()
      setForm(initialStateForm)
    }
  }

  useFocusEffect(
    useCallback(() => {
      return () => {
        setForm(initialStateForm)
        setError(initialStateErrors)
      }
    }, []),
  )

  return (
    <SafeAreaView>
      <ScrollView>
        <KeyboardAvoidingView className="grid gap-4 px-4 py-2">
          <FormControl isRequired size="sm" isInvalid={error.title}>
            <FormControlLabel>
              <FormControlLabelText className="font-semibold">
                Título
              </FormControlLabelText>
            </FormControlLabel>
            <Input variant="outline" className="rounded-lg">
              <InputField
                value={form.title}
                onChangeText={(text) => setForm({ ...form, title: text })}
                onChange={(e) => handleValidate('title', e.nativeEvent.text)}
                onBlur={() => handleValidate('title', form.title)}
              />
            </Input>
            <FormControlError>
              <MaterialIcons name="error" size={18} color="red" />
              <FormControlErrorText>Campo obrigatório.</FormControlErrorText>
            </FormControlError>
          </FormControl>

          <FormControl isRequired size="sm" isInvalid={error.value}>
            <FormControlLabel>
              <FormControlLabelText className="font-semibold">
                Valor
              </FormControlLabelText>
            </FormControlLabel>
            <Input variant="outline" className="rounded-lg">
              <CurrencyInput
                value={form.value}
                onChangeValue={(value) => setForm({ ...form, value })}
                renderTextInput={(props) => <InputField {...props} />}
                onChange={(e) => handleValidate('value', e.nativeEvent.text)}
                onBlur={() => handleValidate('value', form.value)}
                prefix="R$ "
              />
            </Input>
            <FormControlError>
              <MaterialIcons name="error" size={24} color="red" />
              <FormControlErrorText>Campo obrigatório.</FormControlErrorText>
            </FormControlError>
          </FormControl>

          <FormControl isRequired size="sm" isInvalid={error.date} isReadOnly>
            <FormControlLabel>
              <FormControlLabelText className="font-semibold">
                Data
              </FormControlLabelText>
            </FormControlLabel>
            <Input
              variant="outline"
              onTouchStart={() => setShow(true)}
              className="rounded-lg"
            >
              {show && (
                <DateTimePicker value={form.date} onChange={handleDateChange} />
              )}
              <InputField
                value={form.date.toLocaleDateString`pt-BR`}
                onChange={(e) => handleValidate('date', e.nativeEvent.text)}
              />
              <InputSlot>
                <MaterialIcons
                  name="calendar-today"
                  className="mr-3"
                  size={18}
                />
              </InputSlot>
            </Input>
            <FormControlError>
              <MaterialIcons name="error" size={24} color="red" />
              <FormControlErrorText>Campo obrigatório.</FormControlErrorText>
            </FormControlError>
          </FormControl>

          <FormControl isRequired size="sm" isInvalid={error.category}>
            <FormControlLabel>
              <FormControlLabelText className="font-semibold">
                Categoria
              </FormControlLabelText>
            </FormControlLabel>
            <View className="border border-neutral-300 rounded-lg">
              <Picker
                mode="dropdown"
                placeholder="Selecione uma categoria"
                selectedValue={form.category}
                onValueChange={(value) => handleSelectChange(value)}
              >
                {categoriesOptions.map(({ label, value }, index) => (
                  <Picker.Item {...{ label, value }} key={index} />
                ))}
              </Picker>
            </View>
            <FormControlError>
              <MaterialIcons name="error" size={24} color="red" />
              <FormControlErrorText>Campo obrigatório.</FormControlErrorText>
            </FormControlError>
          </FormControl>

          <Button
            action="default"
            size="xl"
            className="bg-main p-2 rounded-md"
            onPress={() => handleSubmit()}
          >
            <MaterialIcons name="save" size={24} color="white" />
            <ButtonText>Salvar</ButtonText>
          </Button>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Cadastro
