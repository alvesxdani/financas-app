import {
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
} from '@/components/ui/form-control'
import { Input, InputField } from '@/components/ui/input'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const Cadastro = () => {
  const initialStateForm = {
    title: '',
    value: '',
    date: '',
    category: '',
  }

  const initialStateErrors = {
    title: false,
    value: false,
    date: false,
    category: false,
  }

  const [form, setForm] = useState(initialStateForm)
  const [error, setError] = useState(initialStateErrors)

  function handleValidate(field: string, value: string) {
    if (value.trim() === '') {
      setError((prev) => ({ ...prev, [field]: true }))
    } else {
      setError((prev) => ({ ...prev, [field]: false }))
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
          <InputField
            value={form.value}
            inputMode="decimal"
            keyboardType="decimal-pad"
            onChangeText={(text) => setForm({ ...form, value: text })}
          />
        </Input>
        <FormControlError>
          <MaterialIcons name="error" size={24} color="red" />
          <FormControlErrorText>Campo obrigatório.</FormControlErrorText>
        </FormControlError>
      </FormControl>
    </SafeAreaView>
  )
}

export default Cadastro
