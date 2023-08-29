import Icon from '@/app/components/IconPicker/components/Icon'
import JustLink from '@/app/components/justlink/JustLink'
import { useDraggable } from '@dnd-kit/core'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

import { RiDraggable } from 'react-icons/ri'

type SortableItemProps = {
  image?: string | null
  title: string
  path: string
  id: string
  disabled: boolean
}

const SortableItem: React.FC<SortableItemProps> = ({
  image,
  title,
  path,
  id,
  disabled
}) => {

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    setActivatorNodeRef
  } = useSortable({ id, disabled })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  }

  return (
    <div className='w-full max-w-4xl flex justify-center relative' style={style} ref={setNodeRef}>
      <JustLink
        dl
        image={image}
        title={title}
        path={path}
        id={id}
      />
      <div ref={setActivatorNodeRef} {...attributes} {...listeners} className='absolute flex items-center rounded-l-xl h-full justify-center -left-6 hover:bg-white fastAnimation hover:cursor-grab'>
        <Icon size={20} icon={RiDraggable} />
      </div>
    </div>
  )
}

export default SortableItem