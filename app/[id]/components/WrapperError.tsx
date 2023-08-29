type WrapperErrorProps = {
  children: React.ReactNode
}

const WrapperError: React.FC<WrapperErrorProps> = ({ 
  children
 }) => {
  
  return (
    <div className="min-h-full flex justify-center items-center text-2xl">
      {children}
    </div>
  )
}

export default WrapperError