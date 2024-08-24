import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import './profileUpdatePage.scss'
function ProfileUpdatePage() {
const {currentUser,updateUser} = useContext(AuthContext);

    return (
    <>
<div className='profileUpdatePage'>
<div className="formContainer">
    <form action="">
        <h1>Update Profile</h1>
        <div className='item'>
            <label htmlFor="username">Username</label>
            <input defaultValue={currentUser.username} id='username' type='text' placeholder='username' />
        </div>
        <div className='item'>
            <label htmlFor="email">Email</label>
            <input defaultValue={currentUser.email} id='email' type='email' placeholder='email' />
        </div>
        
        <div className='item'>
            <label htmlFor="password">Password</label>
            <input
            id='password' type='password' placeholder='password' />
        </div>
        <button >Update</button>
    </form>
</div>
<div className='sideContainer'>
<img src={currentUser.avatar||"/noavatar.png"} alt="" className='avatar' />
</div>

</div>
    </>
    )
}
export default ProfileUpdatePage