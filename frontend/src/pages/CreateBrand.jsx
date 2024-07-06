import { Box, FormControl, FormLabel, Input, Textarea, Button, Spinner, Image } from '@chakra-ui/react';
import Select from 'react-select';
import useGetCategories from '../hooks/useGetCategories';
import { toast } from 'react-toastify';
import { useState } from 'react';
import useImgPreview from '../hooks/useImgPreview';

const CreateBrand = () => {
  const { categories, loading } = useGetCategories();
  const categoryOptions = categories.map((c) => ({ value: c._id, label: c.categoryName }));

  const [inputs, setInputs] = useState({
    brandName: "",
    brandFor: "",
    brandImg: "",
    brandDesc: ""
  });

  const { img, handleImgChange } = useImgPreview();

  const onInputsChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  console.log(inputs);

  const handleCategoryChange = (selectedOption) => {
    setInputs({ ...inputs, brandFor: selectedOption.value });
  };

  const handleCreateBrand = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/brand/create', {
        method: "POST",
        headers: {
          'Content-Type': "application/json"
        },
        body: JSON.stringify({
          brandName: inputs.brandName,
          brandFor: inputs.brandFor,
          brandImg: img,
          brandDesc: inputs.brandDesc
        })
      });
      const data = await res.json();
      if (data.error) {
        toast.error(data.error);
      } else {
        toast.success(data.message);
        setInputs('')
      }
    } catch (error) {
      console.log(error);
      toast.error("Error While Creating Brand");
    }
  };

  return (
    <Box
      position={'absolute'}
      top={'80px'}
      left={'300px'}
      shadow={'md'}
      rounded={'md'}
      p={4}
      width={'750px'}
      color={'black'}
      as="form"
      encType="multipart/form-data"
      onSubmit={handleCreateBrand}
    >
      <FormControl isRequired id="brand-name" mb={4}>
        <FormLabel color={'black'}>Brand Name</FormLabel>
        <Input value={inputs.brandName} placeholder='Brand name, Defacto, LC, Nike' onChange={onInputsChange} type="text" name='brandName' />
      </FormControl>

      <FormControl isRequired id="brand-category" mb={4}>
        <FormLabel color={'black'}>Brand Category</FormLabel>
        {loading ? (
          <Spinner color='black' />
        ) : (
          <Select
            name='brandFor'
            value={categoryOptions.find(option => option.value === inputs.brandFor)}
            onChange={handleCategoryChange}
            options={categoryOptions}
            placeholder="Select a category"
          />
        )}
      </FormControl>

      <FormControl isRequired id="brand-logo" mb={4}>
        <FormLabel color={'black'}>Brand Logo</FormLabel>
        <Input onChange={handleImgChange} name='brandImg' type="file" accept="image/*" />
        {img && (
          <Image src={img} w={'100px'} h={'100px'} />
        )}
      </FormControl>

      <FormControl id="brand-description" mb={4}>
        <FormLabel color={'black'}>Brand Description</FormLabel>
        <Textarea value={inputs.brandDesc} placeholder='Description about brand' onChange={onInputsChange} name='brandDesc' />
      </FormControl>

      <Button colorScheme="blue" type="submit">
        Create Brand
      </Button>
    </Box>
  );
};

export default CreateBrand;
