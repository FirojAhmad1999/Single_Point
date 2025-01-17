import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { LoadingScreen } from '../../components/OperatorsDetails/LoadingScreen';
import { OperatorDetailsHeader } from '../../components/OperatorsDetails/OperatorDetailsHeader';
import { FleetTable } from '../../components/OperatorsDetails/FleetTable';

const OperatorDetailsPage = () => {
  const { id } = useParams();
  const [operator, setOperator] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOperatorDetails = async () => {
      try {
        setIsLoading(true);
        // Simulate API call - replace with actual API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        const data = {
          name: 'Yamal',
          region: 'SALEKHARD',
          email: 'airway@yamal.aero',
          phone: '+8 800 234 44 02',
          fleet: [
            { tail: 'RA-89073', type: 'Sukhoi Superjet 100', category: 'Airliner', yom: '2015', maxPax: '90', yor: '' },
            { tail: 'RA-89072', type: 'Sukhoi Superjet 100', category: 'Airliner', yom: '2015', maxPax: '90', yor: '' }
          ]
        };
        setOperator(data);
      } catch (error) {
        console.error('Error fetching operator details:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOperatorDetails();
  }, [id]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="flex flex-col h-screen">
      <OperatorDetailsHeader operator={operator} />
      <div className="relative flex-1">
        <FleetTable fleet={operator?.fleet} />
      </div>
    </div>
  );
};

export default OperatorDetailsPage;