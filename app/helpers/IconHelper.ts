import {
  BsReddit,
  BsTwitter,
  BsDiscord,
  BsFacebook,
  BsInstagram,
  BsSpotify,
  BsApple,
  BsGithub,
  BsLinkedin,
  BsYoutube,
  BsTwitch,
  BsSteam,
  BsTelegram,
} from 'react-icons/bs'

import {
  MdImageNotSupported
} from 'react-icons/md'

export const icons = [
  { name: '', icon: MdImageNotSupported},
  { name: 'reddit', icon: BsReddit },
  { name: 'twitter', icon: BsTwitter },
  { name: 'discord', icon: BsDiscord },
  { name: 'facebook', icon: BsFacebook },
  { name: 'instagram', icon: BsInstagram },
  { name: 'spotify', icon: BsSpotify },
  { name: 'apple', icon: BsApple },
  { name: 'github', icon: BsGithub },
  { name: 'linkedin', icon: BsLinkedin },
  { name: 'youtube', icon: BsYoutube },
  { name: 'twitch', icon: BsTwitch },
  { name: 'steam', icon: BsSteam },
  { name: 'telegram', icon: BsTelegram },
] as const

export type IconsType = typeof icons[number]['name']