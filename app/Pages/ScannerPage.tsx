import AllergyPhotoCapture from '../components/AllergyPhotoCapture';

const ScannerPage = () => {
  const handlePhotoTaken = (photo) => {
    console.log('Photo captured:', photo);
  };

  const handleCancel = () => {
    console.log('User cancelled photo capture');
  };

  return (
    <AllergyPhotoCapture
      onPhotoTaken={handlePhotoTaken}
      onCancel={handleCancel}
    />
  );
};

export default ScannerPage