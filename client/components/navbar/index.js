import { Avatar, Button, Dropdown, Navbar, Text } from "@nextui-org/react"
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { resetProfile } from "../../redux/user/profile.slice";
import { setLoggedFalse } from "../../redux/user/user.auth";

const collapseItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
];


export const DropdownMenus = () => {
        
        const [isClicked, setIsClicked] = useState(false);
        const dispatch = useDispatch();
        const {push} = useRouter();

        const handleChange = (action) => {
            if(action === 'logout'){
                setIsClicked(true);
            }
        }

        useEffect(() => {
            if(isClicked){
        
                const user_auth = {
                  access_token: '',
                  user_id: ''
                };
        
                localStorage.setItem("user-auth", JSON.stringify(user_auth));
                dispatch(resetProfile());
                dispatch(setLoggedFalse());
                setIsClicked(false);
                push('/');
              }
        }, [isClicked]);

    return (
        <Dropdown placement="bottom-right">
            <Navbar.Item>
                <Dropdown.Trigger>
                    <Avatar
                        bordered
                        as="button"
                        color="warning"
                        size="md"
                        src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                    />
                </Dropdown.Trigger>
            </Navbar.Item>
            <Dropdown.Menu
                aria-label="User menu actions"
                color="warning"
                onAction={(action)=>handleChange(action)}
            >
                <Dropdown.Item key="settings" withDivider>
                    <Link href={"/user/dashboard"}>My Dashboard</Link>
                </Dropdown.Item>
                <Dropdown.Item key="team_settings">
                    Team Settings
                </Dropdown.Item>
                <Dropdown.Item key="analytics" withDivider>
                    Analytics
                </Dropdown.Item>
                <Dropdown.Item key="system">System</Dropdown.Item>
                <Dropdown.Item key="configurations">
                    Configurations
                </Dropdown.Item>
                <Dropdown.Item key="help_and_feedback" withDivider>
                    Help & Feedback
                </Dropdown.Item>
                <Dropdown.Item key="logout" withDivider color="error">
                    Log Out
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
}

export const NavCollapseMenus = () => (
    <Navbar.Collapse disableAnimation>
        { collapseItems.map((item,index) => (
            <Navbar.CollapseItem
                key={item}
                activeColor="warning"
                css={{
                    color: index === collapseItems.length-1 ? "$error" : ""
                }}
                isActive={index === 2}
            >
                <Link
                    color="inherit"
                    css={{
                        minWidth: "100%",
                    }}
                    href="#"
                >
                    {item}
                </Link>
            </Navbar.CollapseItem>
        ))}
    </Navbar.Collapse>
);

const Nav = () => {
    const isLogged = useSelector(state=>state.userAuth.isLogged);
  return (
    <Navbar isBordered variant="sticky">
        <Navbar.Toggle showIn="xs" />
        <Navbar.Brand
            css={{
                "@xs": {
                    w: "12%",
                },
                "cursor": 'pointer'
            }}
        >
            <Link href={"/"}>
                <Image 
                    src="/logo.svg" 
                    alt="makeMyPortfolio" 
                    width="200" 
                    height="200" 
                />
            </Link>
        </Navbar.Brand>
        <Navbar.Content
            enableCursorHighlight
            activeColor="warning"
            hideIn="xs"
            variant="highlight"
        >
            <Navbar.Link>Features</Navbar.Link>
            <Link href={"/admin/dashboard"}>Admin</Link>
        </Navbar.Content>
        <Navbar.Content
            css={{
                "@xs": {
                    w: "12%",
                    jc: "flex-end",
                },
            }}
        >
            { isLogged ? 
                <DropdownMenus /> 
            :   
                <Link href={"/user/login"}>
                    <Text 
                        color="primary" 
                        css={{letterSpacing:'1px'}}
                    >
                        Login
                    </Text>
                </Link>
            }
        </Navbar.Content>
        <NavCollapseMenus />
    </Navbar>
  )
}

export default Nav