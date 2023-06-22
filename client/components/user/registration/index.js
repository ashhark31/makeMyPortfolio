import { Button, Card, Container, Dropdown, Input, Modal, Text } from "@nextui-org/react"
import { useEffect, useState } from "react";
import { Fields } from "./fields.data";
import { appendCitiesData, appendCountriesData, appendStatesData, interest, title } from "./select.data";
import { handleChange } from "./store.data";
import { useDispatch, useSelector } from "react-redux";
import { getCitiesByState, getStatesByCountry } from "../../../data_fetching/address";
import { setCountryElement, setStateElement } from "../../../redux/user/element.slice";
import { postUser } from "../../../data_fetching";
import { activateNotify, setNotify } from "../../../redux/notification.slice";
import { resetRegistration } from "../../../redux/user/registration.slice";
import { setNotification } from "../../notification/setNotification";
import { resetCities, resetStates } from "../../../redux/user/address.slice";
import { useRouter } from "next/router";

const InputField = ({type,value}) => {
        const [status, setStatus] = useState('default');
        const dispatch = useDispatch();
        const setInputStatus = (status) => {
            setStatus(status);
        }

    return (
        type==="date"?
            <Input 
                onChange={
                    (e)=>handleChange(
                        e.target.name,
                        e.target.value,
                        setInputStatus,
                        dispatch
                    )
                }
                aria-labelledby={value}
                labelLeft={value}
                color="primary"
                name={value}
                type={type}
                size="lg"
                bordered
                clearable
                width="400px"           
            />
        :   <Input 
                onChange={
                    (e)=>handleChange(
                        e.target.name,
                        e.target.value,
                        setInputStatus,
                        dispatch
                    )
                }
                aria-labelledby={value}
                placeholder={value}
                status={status}
                color="primary"           
                name={value}
                type={type}
                size="lg"
                bordered
                clearable
                width="400px"
            />
    );
}

const DropdownField = ({type,data}) => {
    const [selected, setSelected] = useState(new Set([type]));
    const [status, setStatus] = useState('default');

    const country = useSelector(state=>state.element.country);
    const state = useSelector(state=>state.element.state);

    const dispatch = useDispatch();

    const setDropdownStatus = (status) => {
        setStatus(status);
    }

    const handleDropdown = (e) => {
        const value = e.currentKey.split("-");

        if(type === "*country"){
            if(value[1] === 'None'){
                dispatch(resetStates());
            } else {
                dispatch(setCountryElement(value));   
            }
        } else if(type === "*state"){
            if(value[1] === 'None'){
                dispatch(resetCities());
            } else {
                dispatch(setStateElement(value));   
            }
        }

        setSelected(value[1]);
        const name = type.toLowerCase();
        handleChange(name,value[1],setDropdownStatus,dispatch);
    }

    useEffect(() => {
        getStatesByCountry(country[0],dispatch);
    }, [country]);

    useEffect(() => {
        getCitiesByState(country[0],state[0],dispatch);
    }, [state]);

    // const selectedValue = useMemo(
    //     () => Array.from(selected).join(", ").replaceAll("_", " "),
    //     [selected]
    // );

    return (
        <Dropdown>
            <Dropdown.Button 
                flat 
                bordered
                size="lg"
                name={type}
                color={status} 
                css={{ tt: "capitalize", width: '400px' }}
            >
                {selected}                  
            </Dropdown.Button>
            <Dropdown.Menu
                color="primary"
                aria-label="Selection"
                disallowEmptySelection
                selectionMode="single"
                selectedKeys={selected}
                onSelectionChange={(e)=>handleDropdown(e)}
            >
                { data.map(({key,value}) => {
                    return (
                        <Dropdown.Item key={key+'-'+value}>
                            {value}
                        </Dropdown.Item>
                    );
                })}
            </Dropdown.Menu>
        </Dropdown>
    );
}

const RegistrationForm = () => {

    const [isClicked, setIsClicked] = useState(false);
    const { push } = useRouter();

    const form = useSelector(state=>state.form);
    const password = useSelector(state=>state.element.confirmPassword);
    const dispatch = useDispatch();

    const countries = useSelector(state=>state.address.countries);
    const states = useSelector(state=>state.address.states);
    const cities = useSelector(state=>state.address.cities);
    
    const country = appendCountriesData(countries);
    const state = appendStatesData(states);
    const city = appendCitiesData(cities);

    const afterHandleSubmit = (status,message) => {
        if(status === 201){
            const msg = message + ' registered.'
            const notified = setNotification('success', msg);
            dispatch(setNotify(notified));
            dispatch(resetRegistration());
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
    }

    const handleSubmit = (e) => {
        setIsClicked(true);
    }

    useEffect(() => {
        if(isClicked){
            if(form.password === password){
                postUser(form,afterHandleSubmit);
            } else {
                const message = 'passwords not matched.';
                afterHandleSubmit(400,message);
            }
            setIsClicked(false);
        }
    }, [isClicked]);

  return (
    <Container fluid responsive align="center">
        <Card.Body className="card-body">
            <Modal
                open={true}
                preventClose={true}
                width="1000px"
                css={{alignItems: 'center'}}
            >
                <Modal.Header
                    css={{marginTop:'30px'}}
                >
                    <Text size={20} css={{fontWeight:'500'}}>
                        Welcome to&nbsp;
                        <Text b size={30}>
                            makeMyPortfolio
                        </Text>
                    </Text>
                </Modal.Header>
                <Modal.Body className="registration-model-body">
                    <Card.Body className="modal-body-div">
                        { Fields.map(({type,value}) => {
                            return (
                                type === 'select' ?
                                    value === "*interest" ?
                                        <DropdownField 
                                            type={value}
                                            data={interest} 
                                        />
                                    : value === "*title" ?
                                        <DropdownField 
                                            type={value}
                                            data={title} 
                                        />
                                    : value === "*country" ?
                                        <DropdownField 
                                            type={value}
                                            data={country} 
                                        />
                                                                                                            : value === "*state" ?
                                        <DropdownField 
                                            type={value}
                                            data={state} 
                                        />
                                    :   <DropdownField 
                                            type={value}
                                            data={city} 
                                        />
                                :   <InputField
                                        type={type}
                                        value={value}
                                    />
                            );
                        })}
                    </Card.Body>
                </Modal.Body>
                <Modal.Footer
                    css={{justifyContent:'center', width: '900px', marginBottom:'30px'}}
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
                    <Button 
                        auto
                        bordered
                        size='lg'
                        color='primary'
                        css={{maxWidth:'150px'}}
                        onClick={(e) => handleSubmit(e)}
                    >
                        Sign up
                    </Button>
                </Modal.Footer>
            </Modal>
        </Card.Body>
    </Container>
  )
}

export default RegistrationForm