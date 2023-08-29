type LayoutProps = {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ 
  children 
}) => {

  return (
    <main className="bg-gray-200 overflow-auto p-5 sm:p-20 gap-10 min-h-full relative flex flex-col justify-center items-center">
      {children}
    </main>
  )
}

export default Layout