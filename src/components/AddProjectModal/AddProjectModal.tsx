import { useState } from 'react';

import '../../styles/components/_addProjectModal.scss';
import Button from '../ui/Button';

const AddProjectModal = () => {
  const [isModalOpen, setModalIsOpen] = useState<boolean>(false);

  const onToggleModal = () => {
    setModalIsOpen(!isModalOpen);
  };

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
