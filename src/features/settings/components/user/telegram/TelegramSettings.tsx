import { useEffect, useState } from 'react';
import { PageWithQR } from './PageWithQR';
import { PageWithChat } from './PageWithChat';
import { useAuth } from '../../../../../providers/AuthProvider';
import { authMe } from '../../../../../core/datasources/authorization_data_source';
import Loader from '../../../../../core/components/Loader';


export default function TelegramSettings() {
  const {token} = useAuth();
  const [tgLinked, setTgLinked] = useState<boolean | null>(null);

  useEffect(() => {authMe(token).then((user) => setTgLinked(user ? user.tgLinked : false))}, [token]);

  if (tgLinked === null) {
    return <Loader size={80} />
  }
  return !tgLinked ? <PageWithQR /> : <PageWithChat/>
}