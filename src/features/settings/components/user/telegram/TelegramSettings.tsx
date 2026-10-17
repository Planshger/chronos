import { useEffect, useState } from 'react';
import { PageWithQR } from './PageWithQR';
import { PageWithChat } from './PageWithChat';
import { useAuth } from '../../../../../providers/AuthProvider';
import { authMe } from '../../../../../core/datasources/authorization_data_source';


export default function TelegramSettings() {
  const {token} = useAuth();
  const [tgLinked, setTgLinked] = useState<boolean>(false);

  useEffect(() => {authMe(token).then((user) => setTgLinked(user ? user.tgLinked : false))}, [token]);

  if (!tgLinked) {
    return (
      <PageWithQR />
    );
  }

  return (
    <PageWithChat/>
  );
}