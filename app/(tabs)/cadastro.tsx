import {
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
} from '@/components/ui/form-control'
import { Input, InputField, InputSlot } from '@/components/ui/input'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import DateTimePicker from '@react-native-community/datetimepicker'
import { Picker } from '@react-native-picker/picker'
import { useState } from 'react'
import { View } from 'react-native'
import CurrencyInput from 'react-native-currency-input'
import { SafeAreaView } from 'react-native-safe-area-context'

type CadastroT = {
  title: string
  value: number | null
  date: Date
  category: string
}

const initialStateForm: CadastroT = {
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
  const [form, setForm] = useState<CadastroT>(initialStateForm)
  const [error, setError] = useState(initialStateErrors)
  const [show, setShow] = useState(false)

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
    } else {
      if (value.trim() === '' || value === null || value < 1) {
        setError((prev) => ({ ...prev, [field]: true }))
      }
    }
  }

  function handleSubmit() {
    handleValidate('title', form.title)
    handleValidate('value', form.value)
    handleValidate('date', form.date)
    handleValidate('category', form.category)

    if (error.title || error.value || error.date || error.category) {
      return
    }
  }

  function handleDateChange(event: any, selectedDate: Date | undefined) {
    const currentDate = selectedDate || form.date
    setShow(false)
    setForm({ ...form, date: currentDate })
  }

  return (
    <SafeAreaView className="grid gap-4 px-4 py-2">
      <FormControl isRequired size="sm" isInvalid={error.title}>
        <FormControlLabel>
          <FormControlLabelText className="font-semibold">
            Título
          </FormControlLabelText>
        </FormControlLabel>
        <Input variant="outline">
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
        <Input variant="outline">
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
        <Input variant="outline" onTouchStart={() => setShow(true)}>
          {show && (
            <DateTimePicker value={form.date} onChange={handleDateChange} />
          )}
          <InputField
            value={form.date.toLocaleDateString`pt-BR`}
            onChange={(e) => handleValidate('date', e.nativeEvent.text)}
          />
          <InputSlot>
            <MaterialIcons name="calendar-today" className="mr-3" size={18} />
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
        <View className="border border-neutral-300">
          <Picker
            mode="dropdown"
            className="border"
            selectedValue={form.category}
            onValueChange={(value) => setForm({ ...form, category: value })}
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
    </SafeAreaView>
  )
}

export default Cadastro
