function getUserRole(data) {
  if (data?.isAdmin) {
    return "Admin";
  } else if (data?.isMentor) {
    return "Mentor";
  } else if (data?.isMentorManager) {
    return "Mentor Manager";
  } else {
    return "";
  }
}

export default getUserRole;
