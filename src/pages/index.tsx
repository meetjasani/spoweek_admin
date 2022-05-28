import { useEffect } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { Route, Switch, useHistory } from "react-router";
import { ApiGet } from "../helper/API/ApiData";
import AuthStorage from "../helper/AuthStorage";
import Layouts from "../layouts/Layouts";
import LogRegLayout from "../layouts/LogRegLayout";
import { changeLoginState } from "../redux/actions/loginAction";
import EventStatistics from "./BasicSetting/EventStatistics/EventStatistics";
import FaqManagement from "./BasicSetting/FAQ/FaqManagement";
import FAQ from "./BasicSetting/FAQ/FaqManagement";
import FaqRegister from "./BasicSetting/FAQ/FaqRegister";
import MainTop from "./BasicSetting/MainTop/MainTop";
import NotificationManagement from "./BasicSetting/Notification/NotificationManagement";
import NotificationRegister from "./BasicSetting/Notification/NotificationRegister";
import ManageDeletedEvent from "./Event/ManageDeletedEvent/ManageDeletedEvent";
import ManageEvent from "./Event/ManageEvent/ManageEvent";
import ManageEventApplication from "./Event/ManageEventApplication/ManageEventApplication";
import ManageEventParticipantRegister from "./Event/ManageEventApplication/ManageEventParticipantRegister";
import ManageEventParticipant from "./Event/ManageEventApplication/ManageEventParticipant";
import RegisterEvent from "./Event/RegisterEvent/RegisterEvent";
import RegisterView from "./Event/RegisterEvent/RegisterView";
import Homepage from "./homepage/Homepage";
import Login from "./login/Login";
import ManageWithdrawal from "./Member/ManageWithdrawal/ManageWithdrawal";
import MemberManagement from "./Member/MemberList/MemberManagement";
import MemberRegister from "./Member/MemberRegister/MemberRegister";
import ParticipantRegisterView from "./Event/ManageEventApplication/ParticipantRegisterView";

const Index = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { is_loggedin } = useSelector((state: RootStateOrAny) => state.login);

  useEffect(() => {
    if (AuthStorage.isUserAuthenticated()) {
      ApiGet("admin/validate")
        .then((res) => {
          dispatch(changeLoginState(true));
          // history.push("/dashboard");
        })
        .catch((error) => {
          AuthStorage.deauthenticateUser();
          history.push("/");
        });
    } else {
      dispatch(changeLoginState(false));
      AuthStorage.deauthenticateUser();
      history.push("/");
    }
  }, []);

  return (
    <>
      <Switch>
        {!is_loggedin ? (
          <RouteWrapper
            exact={true}
            path="/"
            component={Login}
            layout={LogRegLayout}
            isPrivateRoute={false}
          />
        ) : (
          <>
            <RouteWrapper
              exact={true}
              path="/"
              component={EventStatistics}
              layout={Layouts}
              isPrivateRoute={true}
            />

            <RouteWrapper
              exact={true}
              path="/basicsettings/event-statistics"
              component={EventStatistics}
              layout={Layouts}
              isPrivateRoute={true}
            />

            <RouteWrapper
              exact={true}
              path="/basicsettings/main-top"
              component={MainTop}
              layout={Layouts}
              isPrivateRoute={true}
            />

            <RouteWrapper
              exact={true}
              path="/basicsettings/notification"
              component={NotificationManagement}
              layout={Layouts}
              isPrivateRoute={true}
            />

            <RouteWrapper
              exact={true}
              path="/basicsettings/notification-register"
              component={NotificationRegister}
              layout={Layouts}
              isPrivateRoute={true}
            />

            <RouteWrapper
              exact={true}
              path="/basicsettings/FAQ"
              component={FaqManagement}
              layout={Layouts}
              isPrivateRoute={true}
            />

            <RouteWrapper
              exact={true}
              path="/basicsettings/FAQ-register"
              component={FaqRegister}
              layout={Layouts}
              isPrivateRoute={true}
            />

            <RouteWrapper
              exact={true}
              path="/member/member-list"
              component={MemberManagement}
              layout={Layouts}
              isPrivateRoute={true}
            />

            <RouteWrapper
              exact={true}
              path="/member/member-register"
              component={MemberRegister}
              layout={Layouts}
              isPrivateRoute={true}
            />

            <RouteWrapper
              exact={true}
              path="/member/manage-withdrawal"
              component={ManageWithdrawal}
              layout={Layouts}
              isPrivateRoute={true}
            />

            <RouteWrapper
              exact={true}
              path="/event/manage-event"
              component={ManageEvent}
              layout={Layouts}
              isPrivateRoute={true}
            />

            <RouteWrapper
              exact={true}
              path="/event/register-event"
              component={RegisterEvent}
              layout={Layouts}
              isPrivateRoute={true}
            />
            <RouteWrapper
              exact={true}
              path="/event/register-view"
              component={RegisterView}
              layout={Layouts}
              isPrivateRoute={true}
            />


            <RouteWrapper
              exact={true}
              path="/event/manage-event-application"
              component={ManageEventApplication}
              // component={ManageEventParticipant}
              layout={Layouts}
              isPrivateRoute={true}
            />

            <RouteWrapper
              exact={true}
              path="/event/manage-event-participant"
              component={ManageEventParticipant}
              layout={Layouts}
              isPrivateRoute={true}
            />

            <RouteWrapper
              exact={true}
              path="/event/participant-view"
              component={ParticipantRegisterView}
              layout={Layouts}
              isPrivateRoute={true}
            />
            <RouteWrapper
              exact={true}
              path="/event/manage-event-participant-register"
              component={ManageEventParticipantRegister}
              layout={Layouts}
              isPrivateRoute={true}
            />

            <RouteWrapper
              exact={true}
              path="/event/manage-deleted-event"
              component={ManageDeletedEvent}
              layout={Layouts}
              isPrivateRoute={true}
            />
          </>
        )}
        {/* <Redirect from="*" to="/" /> */}
      </Switch>
    </>
  );
};

export default Index;

interface RouteWrapperProps {
  component: any;
  layout: any;
  exact: boolean;
  path: string;
  isPrivateRoute: boolean;
}

function RouteWrapper({
  component: Component,
  layout: Layout,
  isPrivateRoute,
  ...rest
}: RouteWrapperProps) {
  const { is_loggedin } = useSelector((state: RootStateOrAny) => state.login);
  const history = useHistory();
  const isAuthenticated: boolean = isPrivateRoute
    ? is_loggedin
    : true;
  return (
    <>
      {isAuthenticated ? (
        <Route
          {...rest}
          render={(props) => (
            <Layout>
              <Component {...props} />
            </Layout>
          )}
        />
      ) : (
        history.push("/")
      )}
    </>
  );
}
