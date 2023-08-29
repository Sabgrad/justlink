type LayoutProps = {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ 
  children 
}) => {

  return (
    <main className="bg-gray-100 overflow-auto min-h-full relative flex flex-col items-center py-10 px-5 sm:px-10 gap-6">
      {children}
    </main>
  )
}

export default Layout