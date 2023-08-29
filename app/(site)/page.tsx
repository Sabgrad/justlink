import Link from "next/link"
import JustLink from "../components/justlink/JustLink"

const Home = () => {
  return (
    <>
      <h1 className="text-2xl sm:text-3xl">
        Links to all resources in one place.
      </h1>
      <div className="w-full border border-black/10" />
      <div className="w-full relative flex justify-center">
        <div className="absolute w-full h-full z-10" />
        <JustLink title="Just Link" image={'youtube'} path="#" id='' />
      </div>
      <span className="font-medium text-xl sm:text-2xl">Create Account to share links</span>
      <Link className="bg-white rounded-xl hover:scale-110 p-2 text-xl transition-all" href='/auth'>Create</Link>
      <span className="font-medium text-xl sm:text-2xl">Or go to your profile and create links</span>
      <Link className="bg-white rounded-xl hover:scale-110 p-2 text-xl transition-all" href='/user'>Profile</Link>
      <small className="mt-auto">
        The project was created while learning Next JS, Tailwind, Prisma, MongoDB, Next Auth, DnD-kit, React-Form.
      </small>
    </>
  )
}

export default Home