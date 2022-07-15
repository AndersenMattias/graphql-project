import React, { useEffect, useState } from 'react';

import '../../styles/components/_addProjectModal.scss';
import Button from '../ui/Button';

const AddProjectModal = () => {
  const [isModalOpen, setModalIsOpen] = useState<boolean>(false);

  const onToggleModal = () => {
    setModalIsOpen(!isModalOpen);
  };

  useEffect(() => {
    //TODO: Fix event type
    const handleEsc = (event: KeyboardEvent) => {
      if (event.keyCode === 27) {
        setModalIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);

  return (
    <>
      <button onClick={() => setModalIsOpen(!isModalOpen)}>New Project</button>

      {isModalOpen && (
        <div className='modal-wrapper'>
          <div className='modal-container'>
            <h3 className='modal-title'>New Project</h3>

            <div className='modal-content'>
              <form>
                <label>Name</label>
                <input type='text' />
              </form>
            </div>

            <div className='modal-btnContainer'>
              <Button
                type='button'
                colour='btn--primary'
                text='Close'
                onClick={onToggleModal}
              />
              <Button type='button' colour='btn--primary' text='Submit' />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddProjectModal;