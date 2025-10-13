// src/components/2-molecules/FormField.jsx
import Label from '../atoms/Label';
import Input from '../atoms/Input';

const FormField = ({ label, id, type, value, onChange }) => {
  return (
    <div style={{ marginBottom: '15px', width: '100%' }}>
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} type={type} value={value} onChange={onChange} />
    </div>
  );
};

export default FormField;