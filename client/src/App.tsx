import Signing from './widgets/Signing';
import SignatureStore from './widgets/SignatureStore';

const App = () => {
  return (
    <div className="p-4 flex flex-row gap-4">
      <Signing />
      <div className="flex-grow flex flex-col gap-4">
      <SignatureStore />
      </div>
    </div>
  );
}

export default App;
