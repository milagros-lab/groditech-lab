
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { GreenComp } from '../../components/GreenComp';


export const AdminUserFarmer = () => {
  const [user, setUser] = useState();
  const [greenhouses, setGreenhouses] = useState();

  const { user_id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:4000/users/oneUser/${user_id}`)
      .then((res) => {
        setUser(res.data.resultFarmer[0]);
        setGreenhouses(res.data.resultGreen);
      })
      .catch((error) => {
        console.log("ERROR DE ONE USEEEEEEEEEEEEEEEEEEER");
      });
  }, []);

  return (
    <Container>
    
      <GreenComp greenhouses={greenhouses} setGreenhouses={setGreenhouses} />
    </Container>
  );
};
