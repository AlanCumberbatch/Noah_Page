import Button from '@/UIComponents/Button';

const ButtonDemo = () => {
  return (
    <Button label=' A Button' color='red' onClick={() => alert('you just clicked a button.')} />
  )
}

export default ButtonDemo;