// import { useLogoutQuery } from "../redux/services/userApi";
// import { logout } from "../redux/features/userSlice";
import { TailSpin } from "react-loading-icons";
// import { useAppDispatch } from "../redux/hooks";
import { AiOutlineLock } from "react-icons/ai";
// import { useEffect } from "react";
import { t } from "i18next";
import { useTranslation } from "react-i18next";

function Logout({ show }: { show: string }) {
  useTranslation();
  // const { data: response } = useLogoutQuery(null);
  // const dispatch = useAppDispatch();

  // useEffect(() => {
  //   if (response) {
  //     setTimeout(() => {
  //       dispatch(logout());
  //     }, 500);
  //   }
  // }, [response, dispatch]);

  return (
    <>
      <div className={"logout-overlay " + show} />
      <div className={"logout-container " + show}>
        <div className="logout-icons">
          <TailSpin stroke="#8d2840" className="tailspin" />
          <AiOutlineLock className="lock" />
        </div>
        <div className="logout-text">
          <p>{t("logging_out")}</p>
        </div>
      </div>
    </>
  );
}

export default Logout;
