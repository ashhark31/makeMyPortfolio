import { Button, Card, Checkbox, Container, Input, Modal, Row, Text } from "@nextui-org/react"
import { Fields } from "./fields.data";
import { handleChange } from "./store.data";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { postAdminAuth, postUserAuth } from "../../../data_fetching/login";
import { setNotification } from "../../notification/setNotification";
import { activateNotify, setNotify } from "../../../redux/notification.slice";
import { resetLogin } from "../../../redux/user/login.slice";
import { useRouter } from "next/router";
import { resetStatus, setStatus } from "../../../redux/user/token.slice";
import { Mail } from '../../svg/mail'
import { Password } from '../../svg/password'
import { setLoggedTrue } from "../../../redux/user/user.auth";
import { resetAdminStatus, setAdminStatus } from "../../../redux/admin/token.slice";

const InputField = ({type,value}) => {
        const dispatch = useDispatch();
    return (
        <Input
            onChange={(e)=>handleChange(e,dispatch)} 
            contentLeft={ value === "*Email" 
                ?   <Mail fill='currentColor' /> 
                : <Password fill='currentColor' />
            }
            placeholder={value.slice(1)}
            aria-labelledby={value}
            color="primary"              
            name={value}
            type={type}
            size="lg"
            bordered
            clearable
            fullWidth
        />
    );
}

const LoginForm = ({type}) => {

    const [isUserClicked, setIsUserClicked] = useState(false);
    const [isAdminClicked, setIsAdminClicked] = useState(false);
    const user = useSelector(state=>state.login);

    const userStatus = useSelector(state=>state.token.status);
    const adminStatus = useSelector(state=>state.adminToken.status);

    const dispatch = useDispatch();
    const { push } = useRouter();

    const afterHandleClick = (status,message) => {
        if(status === 201){
            const msg = 'Welcome back ' + message;
            const notified = setNotification('success', msg);
            dispatch(setNotify(notified));
            dispatch(resetLogin());
        } else {
            if(message instanceof Array){
                const notified = setNotification('error', message[0]?.message);
                dispatch(setNotify(notified));    
            } else {
                const notified = setNotification('error', message);
                dispatch(setNotify(notified));
            }
        }
        dispatch(activateNotify());
        if(isUserClicked){
            dispatch(setStatus(status));
        } else if(isAdminClicked){
            dispatch(setAdminStatus(status));
        }
    }

    const handleSubmit = (e) => {
        const name = e.target.name;
        if(name === "user"){
            setIsUserClicked(true);
        } else if(name === "admin"){
            setIsAdminClicked(true);
        }
    }

    // User Authentication
    useEffect(() => {
        if(isUserClicked){
            postUserAuth(user,afterHandleClick);
        }
        setIsUserClicked(false);
    }, [isUserClicked]);

    useEffect(() => {
        if(userStatus === 201){
            dispatch(setLoggedTrue());
            push('/');
        }
        dispatch(resetStatus());
    }, [userStatus]);   


    // Admin Authentication
    useEffect(() => {
        if(isAdminClicked){
            postAdminAuth(user,afterHandleClick);
        }   
        setIsAdminClicked(false);
    }, [isAdminClicked]);

    useEffect(() => {
        if(adminStatus === 201){
            push("/admin/dashboard");
        }
        dispatch(resetAdminStatus());
    }, [adminStatus]);

  return (
    <Container fluid responsive align="center">
        <Card.Body className="card-body">
            <Modal
                open={true}
                width="500px"
                preventClose={true}
            >
                <Modal.Header css={{marginTop:'15px'}}>
                    <Text size={20} css={{fontWeight:'500'}}>
                        {type==="user"?"welcome! ":""}
                        <Text b size={30}>
                            {type==="user"?"Login":"Admin"}
                        </Text>
                    </Text>
                </Modal.Header>
                <Modal.Body
                    css={{width:'450px', marginLeft:'25px'}}
                >
                    { Fields.map(({type,value}) => {
                        return (
                            <InputField 
                                type={type} 
                                value={value}
                            />
                        );
                    })}
                    <Row justify="space-between">
                        <Checkbox>
                        <Text size={14}>Remember me</Text>
                        </Checkbox>
                        <Text size={14}>Forgot password?</Text>
                    </Row>
                </Modal.Body>
                <Modal.Footer 
                    css={{
                        justifyContent: 'center', 
                        marginBottom: '25px'
                    }}
                >
                    <Button 
                        auto 
                        bordered 
                        size="lg" 
                        color="error"
                        css={{maxWidth:'150px'}}
                        onClick={()=>push("/")}
                    >
                        Close
                    </Button>
                    <Button auto bordered size="lg" 
                        name={type}
                        css={{maxWidth:'150px'}}
                        onClick={(e)=>handleSubmit(e)}
                    >
                        Sign in
                    </Button>
                </Modal.Footer>
            </Modal>
        </Card.Body>
    </Container>
  )
}

export default LoginForm