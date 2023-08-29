import getCurrentUser from '../action/getCurrentUser'
import getLinks from '../action/getLinks'

import CreateLink from './components/CreateLink'
import LinkList from './components/LinkList'
import ProfileImage from './components/ProfileImage'

const UserPage = async () => {

  const currentUser = await getCurrentUser()

  if (!currentUser) return <>no user</>

  const links = await getLinks(currentUser?.name)

  return (
    <>
      <ProfileImage name={currentUser.name} image={currentUser.image} />
      <span className='font-semibold text-2xl border-b w-full flex justify-center'>{currentUser?.name}</span>
      <CreateLink position={links ? links.length : 0}/>
      {
        links ? <LinkList linksFromParent={links}/> : null
      }
    </>
  )
}

export default UserPage