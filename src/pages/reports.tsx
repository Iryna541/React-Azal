import { Flex, Title } from '@mantine/core';
import React from 'react';
import { Layout } from '~/components/Layout';
import { InsightsProvider } from '~/modules/askq/insightsContext';
import { ProtectedRoute } from '~/modules/auth/components/ProtectedRoute';
import { ShawnSalemaSetup } from './askq';

const ReportsPage = () => {
    return (
        <ProtectedRoute>
            {/* <Layout> */}
            
        <InsightsProvider>
        {/* <Flex justify="space-between">
          <Title order={3} mb="lg">
            Reports
          </Title>
        </Flex> */}
          <ShawnSalemaSetup/>
        </InsightsProvider>
            {/* </Layout> */}
        </ProtectedRoute>
    );
};

export default ReportsPage;