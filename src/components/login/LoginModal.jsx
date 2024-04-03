import Modal from 'react-modal';
import { useRef } from 'react';
import { loginUser } from '../../helper/ApiCallFunctions';
import styles from './LoginRegister.module.scss';

const modalStyle = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#a2d2ff',
    },
}

Modal.setAppElement('#root');

const LoginModal = ({ setLoginModal, loginModal, setRegisterModal, setAnyChange }) => {
    const emailRef = useRef();
    const passwordRef = useRef();

    function handleLogin(e) {
        e.preventDefault();
        const res = loginUser(emailRef.current.value.trim(), passwordRef.current.value.trim(), setAnyChange);
        res.then(r => {
            if (r) setLoginModal(false);
        });
    }
    function closeModal() {
        setLoginModal(false);
    }
    function handleRegisterHere() {
        setLoginModal(false);
        setRegisterModal(true);
    }
    return <>
        <div>
            <Modal isOpen={loginModal} onRequestClose={closeModal} style={modalStyle} contentLabel='Login Modal'>
                <button onClick={closeModal} className={styles.modalCloseButton}>X</button>
                <h2>Sign in Yourself</h2>
                <form onSubmit={handleLogin} className={styles.loginRegisterForm}>
                    <input ref={emailRef} type="email" placeholder='e.g. example@gmail.com' />
                    <input ref={passwordRef} type='password' placeholder='Password' />
                    <button type='submit'>LOGIN</button>
                </form>
                <div className={styles.loginRegisterHere}>
                    <p>Don't have account</p>
                    <button onClick={handleRegisterHere}>Register here!</button>
                </div>
            </Modal>
        </div>
    </>
}

export default LoginModal;