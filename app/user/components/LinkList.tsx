'use client'

import { Link } from "@prisma/client"

import { DndContext, closestCenter } from '@dnd-kit/core'

import { SortableContext, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable'

import { useEffect, useState } from "react"
import SortableItem from "./SortableItem"
import axios from "axios"
import { useRouter } from "next/navigation"
import Button from "@/app/components/buttons/Button"

const isEqual = (firstArr: Link[], secondArr: Link[]) => {
  if (!firstArr.length || !secondArr.length) return true
  if (JSON.stringify(firstArr) === JSON.stringify(secondArr)) return true
}

type LinkListProps = {
  linksFromParent: Link[]
}

const LinkList: React.FC<LinkListProps> = ({
  linksFromParent
}) => {

  const [links, setLinks] = useState<Link[]>([])
  const [disableDnD, setDisableDnD] = useState<boolean>(false)

  const router = useRouter()

  const handleDragEnd = (e: any) => {

    const { active, over } = e

    if (active.id !== over.id) {

      setLinks((items) => {
        const activeIndex = items.findIndex((id) => id.id === active.id)
        const overIndex = items.findIndex((id) => id.id === over.id)

        return arrayMove(items, activeIndex, overIndex).map((el, index) => ({ ...el, position: index }))
      })
    }
  }

  useEffect(() => {
    setLinks(linksFromParent.sort((a, b) => a.position > b.position ? 1 : -1))
  }, [linksFromParent])

  const saveLinksPostion = () => {
    setDisableDnD(true)
    const promises = links.map((link) => axios.patch(`api/link/${link.id}`, { position: link.position }))
    Promise.allSettled(promises)
      .finally(() => {
        router.refresh();
        setDisableDnD(false)
      })
  }

  return (
    <div className="w-full flex flex-col items-center gap-6">
      {
        isEqual(links, linksFromParent) ?
          null :
          <Button onClick={saveLinksPostion}>
            Save new links postion
          </Button>
      }
      <DndContext
        id="List"
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={links}
          strategy={verticalListSortingStrategy}
        >
          {links?.map((link) =>
            <SortableItem
              key={link.id}
              disabled={disableDnD}
              image={link.image}
              title={link.title}
              path={link.path}
              id={link.id}
            />
          )}
        </SortableContext>
      </DndContext>
    </div>
  )
}

export default LinkList