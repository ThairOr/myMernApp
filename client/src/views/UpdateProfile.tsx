// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// function UpdateProfile() {
//   const [isEditing, setIsEditing] = useState(false);
//   const navigate = useNavigate();

//   // const;

//   function handleBackIconOnUpdate() {
//     navigate("/profile");
//     setIsEditing(false);
//   }
//   return (
//     <>
//       <NavigationBar />
//       {isEditing && (
//         <span>
//           <img
//             src={BackIcon}
//             alt="Back"
//             onClick={handleBackIconOnUpdate}
//             id="back-icon"
//           />
//         </span>
//       )}
//       <div className="title-and-logo">
//         <img src={SmallLogo} alt="Logo" id="small-logo" />
//         {!isEditing ? <p>profile</p> : <p>update profile</p>}
//       </div>
//       <hr id="line"></hr>
//       {!isEditing ? (
//         <ProfileCard setIsEditing={setIsEditing} isEditing={isEditing} />
//       ) : (
//         <UpdateProfileCard
//           setIsEditing={setIsEditing}
//           isEditing={(isEditing, setIsEditing)}
//         />
//       )}
//     </>
//   );
// }

// export default UpdateProfile;
