// conexão com o servidor, assim ouvindo a porta que desejar.
import app from './app';

app.listen(3333, () => {
  console.log('conexão estabelecida com sucesso!');
});
