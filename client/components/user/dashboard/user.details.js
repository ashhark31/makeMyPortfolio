import { Card, Grid, Row, Text, User } from '@nextui-org/react'
import { fieldsData, userProfileData } from './fields.data';
import React, { useEffect } from 'react';
import { getUserProfile } from '../../../data_fetching/login';
import { useDispatch, useSelector } from 'react-redux';
import { setProfile } from '../../../redux/user/profile.slice';
import Link from 'next/link';

const UserProfile = ({userData}) => {
    return (
        <User
            squared
            pointer
            size='xl'
            text={userData.img}
            name={userData.username}
            color='primary'
            description={
                <Link href={'/user/my_portfolio'}>
                    <Text color='primary' size={'small'}>
                        @myPortfolio
                    </Text>
                </Link>    
            }
        />
    );
}

const Description = ({fields,user}) => {
    return (
        <div>
            <div className="px-4 sm:px-0">
                <h3 className="text-base font-semibold leading-7 text-gray-900">Applicant Information</h3>
                <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Registration details.</p>
            </div>
            <div className="mt-6 border-t border-gray-100">
            <dl className="divide-y divide-gray-100">
                { fields.map((field,index) => (
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">{field}</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                            {user[index]}
                        </dd>
                    </div>
                ))}
            </dl>
            </div>
        </div>
    );
}

const UserDetails = () => {
    const userFieldsData = fieldsData();
    const dispatch = useDispatch();

    const userProfile = useSelector(state=>state.profile);
    const userData = userProfileData(userProfile);

    const afterUseEffect = (result) => {
        dispatch(setProfile(result));
    }

    useEffect(() => {
        const user_auth = localStorage.getItem("user-auth");
        const user = JSON.parse(user_auth);
        const token = user.access_token;
        const id = user.user_id;
        getUserProfile(token,id,afterUseEffect);
    }, []);

  return (
    <Card.Body className="card-body-dashboard">
        <Row justify="center" align="center" className="form">
            <Grid.Container justify="center" align="center" gap={2}>
                <Row justify="center" align="center">
                    <Grid>
                        <UserProfile userData={userData[0]} />
                    </Grid>                    
                </Row>           
            </Grid.Container>
        </Row>
        <Description fields={userFieldsData} user={userData[1]} />
    </Card.Body>
  )
}

export default UserDetails