import { IconType } from 'react-icons'

type IconProps = {
  icon: IconType
  onClick?: () => void
  size?: number
  className?: string
}

const Icon: React.FC<IconProps> = ({
  icon: Icon,
  onClick, size,
  className
}) => {

  return (
    <Icon
      className={className}
      onClick={onClick}
      size={size ? size : 36}
    />
  )
}

export default Icon
