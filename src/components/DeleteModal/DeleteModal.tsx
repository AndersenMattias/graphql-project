import { useEffect } from 'react';
import Button from '../ui/Button';

interface ModalProps {
  toggleModal: boolean;
  setToggleModal: React.Dispatch<React.SetStateAction<boolean>>;
  name: string;
}

const DeleteModal = ({ toggleModal, setToggleModal, name }: ModalProps) => {
  useEffect(() => {
    //TODO: Fix event type
    const handleEsc = (event: KeyboardEvent) => {
      if (event.keyCode === 27) {
        setToggleModal(false);
      }
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);

  return (
    <>
      {toggleModal && (
        <div className='modalWrapper-client'>
          <div className='modalContainer-client'>
            <h3 className='modalTitle-client'>Confirm</h3>

            <div className='modalContent-client'>
              <p>Do you want to delete {name}?</p>
            </div>

            <div className='modal-btnContainer'>
              <Button
                id='btn-close'
                type='button'
                colour='btn--primary'
                text='Close'
                onClick={() => setToggleModal(false)}
              />
              <Button type='submit' colour='btn--primary' text='Yes' />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteModal;
