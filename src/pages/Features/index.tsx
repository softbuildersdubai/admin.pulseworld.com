import { useEffect, useState } from 'react';

// REDUX
import { useSelector } from 'react-redux';

// COMMON
import { refresh } from '../../images/other';
import { useFeaturesActions } from '../../store/features/featuresAction';
import { selectFeatures } from '../../store/features/featuresSlice';
import FeaturesTable from '../../components/Features/FeaturesTable';

const Features = () => {
  const { getFeaturesList } = useFeaturesActions();
  const { featuresList } = useSelector(selectFeatures);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      await getFeaturesList();
      setLoading(false);
    })();
  }, []);

  return (
    <div className="w-full px-2">
      {/* PAGE TITLE */}
      <div className="flex bg-primary items-center text-white">
        <h1 className="flex-1 font-bold text-2xl py-1">Features</h1>

        <div
          className="flex gap-1 items-center cursor-pointer px-3"
          onClick={async () => {
            setLoading(true);
            await getFeaturesList(true);
            setLoading(false);
          }}
        >
          <img src={refresh} alt="" width={24} height={24} />
          <span>Refresh</span>
        </div>
      </div>

      {/* TABLE */}
      <FeaturesTable data={featuresList} loading={loading} />
    </div>
  );
};

export default Features;
