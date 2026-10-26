import { useEffect, useState } from 'react';
import { PageWithQR } from './PageWithQR';
import { PageWithChat } from './PageWithChat';
import { useAuth } from '../../../../auth/AuthProvider';
import { authMe } from '../../../../auth/datasources/authorization_data_source';
import Loader from '../../../../../shared/ui/Loader';

export default function TelegramSettings() {
  const { token } = useAuth();
  const [tgLinked, setTgLinked] = useState<boolean | null>(null);

  useEffect(() => {
    authMe(token).then((user) => setTgLinked(user ? user.tgLinked : false));
  }, [token]);

  if (tgLinked === null) {
    return <Loader size={80} />;
  }
  return !tgLinked ? <PageWithQR /> : <PageWithChat />;
}
