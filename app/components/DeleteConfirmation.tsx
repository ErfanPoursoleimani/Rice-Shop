'use client'
import { AlertDialog, Button, Flex } from '@radix-ui/themes'

const DeleteConfirmationPage = ({ DeleteButton, name, onClickFunction}: any) => {
  return (
    <>
    <AlertDialog.Root>
        <AlertDialog.Trigger>
            {DeleteButton}
        </AlertDialog.Trigger>
        <AlertDialog.Content>
            <AlertDialog.Title>
                confirm Deletion
            </AlertDialog.Title>
            <AlertDialog.Description>
                Are you sure you want to delete {name}? This action cannot be undone.
            </AlertDialog.Description>
            <Flex mt='4' gap='3'>
                <AlertDialog.Cancel>
                    <Button variant='soft' color='gray'>Cancel</Button>
                </AlertDialog.Cancel>
                <AlertDialog.Action>
                    <Button onClick={onClickFunction} color='red'>Delete {name}</Button>
                </AlertDialog.Action>
            </Flex>
        </AlertDialog.Content>
    </AlertDialog.Root>
    </>
  )
}

export default DeleteConfirmationPage