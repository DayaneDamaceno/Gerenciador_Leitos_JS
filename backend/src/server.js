// conexão com o servidor, assim ouvindo a porta que desejar.
import app from './app';

app.listen(3000, () => {
  console.log('conexão estabelecida com sucesso!');
});
