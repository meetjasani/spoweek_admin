import React, { useEffect, useState } from 'react'
import "./Sidebar.css"
import { CSidebar, CSidebarNav, CCreateElement, CSidebarNavDivider, CSidebarNavDropdown, CSidebarNavItem, CSidebarNavTitle } from '@coreui/react'
import { _navbasicsettings, _navmember, _navevent } from "./SidebarMenu"
import { RootStateOrAny, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import $ from 'jquery'
function Sidebar() {
    const location = useLocation()
    const loctionPath = location.pathname.split('/')[1]
    const { is_toggleMenu } = useSelector((state: RootStateOrAny) => state.menuToggle);
    const { sidebarMenu } = useSelector((state: RootStateOrAny) => state.sidebarMenu);
    const history = useHistory()
    const sidebarClass = is_toggleMenu ? 'sidebar-small' : 'sidebar';
    const [menuList, setMenuList] = useState(_navbasicsettings)

    const sidebarActive = (menu: any) => {
        let temp = [...menu];
        let basicsettingsNotification = ['/basicsettings/notification-register']
        let basicsettingsFAQ = ['/basicsettings/FAQ-register']
        let eventManageEvent = ['/event/register-view']
        let eventManageEventApplication = ['/event/manage-event-participant', '/event/participant-view']
        temp = temp.map((x: any) => {
            if (basicsettingsNotification.includes(location.pathname)) {
                if (x.to == "/basicsettings/notification") {
                    return {
                        ...x,
                        to: location.pathname
                    }
                } else {
                    return {
                        ...x,
                    }
                }
            }

            if (basicsettingsFAQ.includes(location.pathname)) {
                if (x.to == "/basicsettings/FAQ") {
                    return {
                        ...x,
                        to: location.pathname
                    }
                } else {
                    return {
                        ...x,
                    }
                }
            }

            if (eventManageEvent.includes(location.pathname)) {
                if (x.to == "/event/manage-event") {
                    return {
                        ...x,
                        to: location.pathname
                    }
                } else {
                    return {
                        ...x,
                    }
                }
            }

            if (eventManageEventApplication.includes(location.pathname)) {
                if (x.to == "/event/manage-event-application") {
                    return {
                        ...x,
                        to: location.pathname
                    }
                } else {
                    return {
                        ...x,
                    }
                }
            }
            return {
                ...x
            }
        })
        return temp
    }

    const handleRedirect = (key: any) => {
        // if (key == undefined || key == null || key == "") return
        if (key == "/basicsettings/FAQ-register") {
            history.push('/basicsettings/FAQ')
        }
        if (key == "/basicsettings/notification-register") {
            history.push('/basicsettings/notification')
        }
        if (key == "/event/register-view") {
            history.push('/event/manage-event')
        }
        if (key == "/event/manage-event-participant" || key == "/event/participant-view") {
            history.push('/event/manage-event-application')
        }
    }

    useEffect(() => {
        if (sidebarMenu === "basicsettings") {
            setMenuList(_navbasicsettings)
        }
        if (sidebarMenu === "member") {
            setMenuList(_navmember)
        }
        if (sidebarMenu === "event") {
            setMenuList(_navevent)
        }
    }, [sidebarMenu])


    useEffect(() => {
        if (loctionPath === "basicsettings") {
            setMenuList(_navbasicsettings)
        }
        if (loctionPath === "member") {
            setMenuList(_navmember)
        }
        if (loctionPath === "event") {
            setMenuList(_navevent)
        }
    }, [loctionPath])

    return (
        <div id="mySidebar" className={sidebarClass} >
            <CSidebar show={true} >
                <CSidebarNav className="sidebar-in" onClick={(e: any) => handleRedirect(e?.view?.frames?.location?.pathname)}>
                    <CCreateElement
                        items={sidebarActive(menuList)}
                        components={{
                            CSidebarNavDivider,
                            CSidebarNavDropdown,
                            CSidebarNavItem,
                            CSidebarNavTitle,
                        }}
                    />
                </CSidebarNav>
            </CSidebar>
        </div>
    )
}

export default Sidebar
