import Modal from 'react-modal';
import { useRef } from 'react';
import { registerUser } from '../../helper/ApiCallFunctions';
import styles from './LoginRegister.module.scss';

const modalStyle = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#a2d2ff'
    },
}

Modal.setAppElement('#root');

const RegisterModal = ({ setRegisterModal, registerModal, setLoginModal }) => {
    const nameRef = useRef();
    const emailRef = useRef();
    const phoneRef = useRef();
    const passwordRef = useRef();

    function handleRegister(e) {
        e.preventDefault();
        registerUser(nameRef.current.value.trim(), emailRef.current.value.trim(), phoneRef.current.value.trim(), passwordRef.current.value.trim())
            .then(r => {
                if (!r) return;
                else {
                    setLoginModal(true);
                    setRegisterModal(false);
                }
            })
    }

    function closeModal() {
        setRegisterModal(false);
    }
    function handleLoginHere() {
        setLoginModal(true);
        setRegisterModal(false);
    }
    return <>
        <div>
            <Modal isOpen={registerModal} onRequestClose={closeModal} style={modalStyle} contentLabel='Register Modal'>
                <button onClick={closeModal} className={styles.modalCloseButton}>X</button>
                <h2>Register Yourself</h2>
                <form onSubmit={handleRegister} className={styles.loginRegisterForm}>
                    <input ref={nameRef} type="text" placeholder='e.g. Mark John' />
                    <input ref={emailRef} type="email" placeholder='e.g. example@gmail.com' />
                    <input ref={phoneRef} type="tel" placeholder='e.g. 81XXXXXXXX' />
                    <input ref={passwordRef} type='password' placeholder='Password' />
                    <button type='submit'>REGISTER</button>
                </form>
                <div className={styles.loginRegisterHere}>
                    <p>Already Registered</p>
                    <button onClick={handleLoginHere}>Login here!</button>
                </div>
            </Modal>
        </div>
    </>
}

export default RegisterModal;