import { defineComponent } from 'vue'
import Label from './label.vue'

export const UILabel = defineComponent({
  name: 'UILabel',
  extends: Label
})

export type UILabelProps = {
  htmlFor?: string
  required?: boolean
  disabled?: boolean
}

export { UILabel as Label }