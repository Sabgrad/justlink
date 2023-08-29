'use client'

import Button from '@/app/components/buttons/Button'
import LinkForm from '@/app/components/linkform/LinkForm'
import ModalWindow from '@/app/components/modals/ModalWindow'

import React, { useState } from 'react'

type CreateLinkProps = {
  position: number
}

const CreateLink: React.FC<CreateLinkProps> = ({
  position
}) => {

  const [modal, setModal] = useState<boolean>(false)

  return (
    <>
      <Button onClick={() => setModal(true)}>
        {'Create Link'}
      </Button>

      <ModalWindow active={modal} setActive={setModal}>
        <LinkForm formFor='create' position={position}/>
      </ModalWindow>
    </>
  )
}

export default CreateLink
