import {AiOutlineClose} from 'react-icons/ai';

interface ModalProps {
    title: string;
    children: React.ReactNode
    footer: React.ReactNode;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    }

function Modal({title, footer, setIsOpen, children}: ModalProps) {
  
  return (
    <>
    <div className='darkBG' onClick={() => setIsOpen(false)} />
    <div className="modal">
      <div className="modal-container">
        <div className="modal-header">
          <h2 className="modal-title">{title}</h2>
          <button className="modal-close" onClick={() => setIsOpen(false)}>
            <AiOutlineClose />
          </button>
        </div>
        <div className="modal-body">{children}</div>
        <div className="modal-footer">{footer}</div>
      </div>
    </div>
    </>
  );
}

export default Modal;