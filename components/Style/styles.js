import { StyleSheet } from "react-native";
import Constants from "expo-constants";
import color from "./color";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    backgroundColor: "white",
    justifyContent: "space-between",
  },
  loginContainer: {
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    padding: 20,
  },
  loginInputContainer: {
    flexDirection: "row",
    borderColor: color.primary,
    borderBottomWidth: 1,
  },
  loginInput: {
    flex: 1,
    padding: 5,
  },

  loginTextTopContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginLeft: 20,
    marginTop: Constants.statusBarHeight * 1.5,
  },
  circleContainer: {
    flexDirection: "row",
    alignItems: "center",
    left: 35,
  },
  loginTextTopContainerSmallCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: color.primary,
    elevation: 12,
    shadowColor: "grey",
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 30,
    marginRight: 20,
  },
  loginTextTopContainerBigCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: color.primary,
    elevation: 30,
    shadowColor: "grey",
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 30,
  },
  icon: {
    alignSelf: "center",
    paddingRight: 5,
  },
  submitButton: {
    backgroundColor: color.primary,
    left: "60%",
    paddingLeft: "10%",
    marginTop: 30,
    borderRadius: 25,
    width: "60%",
    elevation: 5,
    shadowColor: "grey",
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 30,
  },
  submitButtonText: {
    color: "white",
    padding: 12,
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  loginTextBottomContainer: {
    marginLeft: 20,
    marginRight: 20,
    bottom: 25,
    marginTop: 10,
    alignItems: "flex-end",
  },
  imgAndInputContainer: {
    alignItems: "center",
    width: "100%",
  },
  imageLogo: { width: 150, height: 150 },
  loginTextBottomContainerBigCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: color.primary,
    elevation: 30,
    shadowColor: "grey",
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 30,
    left: -60,
  },
  loginTextBottomContainerSmallCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: color.primary,
    elevation: 17,
    shadowColor: "grey",
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 30,
    right: 37,
  },
  googleLogin: {
    flexDirection: "row",
    backgroundColor: "white",
    justifyContent: "space-between",
    borderRadius: 50,
    elevation: 5,
    shadowColor: "grey",
    shadowOpacity: 0.5,
    shadowRadius: 30,
    shadowOffset: {
      width: 5,
      height: 5,
    },
    padding: 5,
    paddingHorizontal: 20,
  },

  googleLogo: {
    width: 30,
    height: 30,
    alignSelf: "center",
    marginRight: 15,
  },

  googleText: {
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 15,
    color: "#474747",
  },
  fbLogin: {
    flexDirection: "row",
    backgroundColor: "#326ba8",
    justifyContent: "space-between",
    borderRadius: 50,
    marginLeft: 20,
    elevation: 5,
    shadowColor: "grey",
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 30,
  },

  fbLogo: {
    alignSelf: "center",
    marginLeft: 15,
  },

  fbText: {
    padding: 13,
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 10,
    color: "white",
  },
  loginText: {
    fontSize: 25,
    fontWeight: "bold",
    marginLeft: 5,
    // fontFamily: "monospace",
  },
  signupText: {
    fontSize: 25,
    fontWeight: "bold",
    marginLeft: 70,
    // fontFamily: "monospace",
    textDecorationLine: "underline",
    textDecorationColor: color.primary,
    elevation: 10,
    color: "black",
  },
  profileContainer: {
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "space-between",
  },
  productContainer: {
    flexDirection: "row",
    borderColor: color.primary,
    borderBottomWidth: 1,
  },
  profilePic: {
    alignSelf: "center",
    borderRadius: 20,
    width: 120,
    height: 120,
    overflow: "hidden",
    marginBottom: 20,
  },
});

export default styles;
