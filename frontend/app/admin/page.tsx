"use client";
import Content from '@/components/Dashboard/Content';
import { useSession } from 'next-auth/react';
import React from 'react'

const Dashboard:React.FC  = () => {
  const {data: session} = useSession();
  console.log(session);
   
  return (
    <Content title="Dashboard" right={<></>}>
      <h1>Dashboard</h1>
    </Content>
  )
}

export default Dashboard
