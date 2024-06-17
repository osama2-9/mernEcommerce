import { useState, useEffect } from 'react';
import Select from 'react-select';
import countries from 'world-countries';
import { Box, Button, FormControl, FormLabel, Input, useColorModeValue, Text, Heading } from '@chakra-ui/react';
import { toast } from 'react-toastify';
import { useRecoilValue } from 'recoil';
import userAtom from '../atoms/userAtom';

const countryOptions = countries
    .filter((c) => c.name.common !== 'Israel')
    .map((country) => ({
        value: country.cca2,
        label: country.name.common,
    }));

const addressNameOptions = [
    { value: 'Home', label: 'Home' },
    { value: 'Work', label: 'Work' },
];

const Address = () => {
    const logged = useRecoilValue(userAtom);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [selectedAddressName, setSelectedAddressName] = useState(null);
    const [city, setCity] = useState('');
    const [street, setStreet] = useState('');
    const [apartmentFloor, setApartmentFloor] = useState('');
    const [apartmentNumber, setApartmentNumber] = useState('');
    const [showUpdateForm, setShowUpdateForm] = useState(false);

    useEffect(() => {
        if (logged && logged.address) {
            setSelectedAddressName(addressNameOptions.find(option => option.value === logged.address.addressName));
            setSelectedCountry(countryOptions.find(option => option.label === logged.address.country));
            setCity(logged.address.city);
            setStreet(logged.address.street);
            setApartmentFloor(logged.address.apartmentFloor);
            setApartmentNumber(logged.address.apartmentNumber);
        }
    }, [logged]);

    const handleCountryChange = (selectedOption) => {
        setSelectedCountry(selectedOption);
    };

    const handleAddressNameChange = (selectedOption) => {
        setSelectedAddressName(selectedOption);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/users/addAddress', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    uid: logged?.uid,
                    addressName: selectedAddressName ? selectedAddressName.value : null,
                    country: selectedCountry ? selectedCountry.label : null,
                    city: city,
                    street: street,
                    apartmentFloor: apartmentFloor,
                    apartmentNumber: apartmentNumber
                })
            });

            const data = await res.json();
            const updatedUser = {
                ...logged,
                address: {
                    addressName: selectedAddressName ? selectedAddressName.value : null,
                    country: selectedCountry ? selectedCountry.label : null,
                    city: city,
                    street: street,
                    apartmentFloor: apartmentFloor,
                    apartmentNumber: apartmentNumber
                }
            };

            if (data.error) {
                toast.error(data.error);
            } else {
                localStorage.setItem('user', JSON.stringify(updatedUser));
                toast.success("Your address has been updated");
                setShowUpdateForm(false);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    return (
        <Box
            bg={useColorModeValue('white', 'gray.800')}
            p={8}
            borderRadius="lg"
            shadow="md"
        >
            {!showUpdateForm && logged && logged.address && (
                <>
                    <Heading as="h2" size="lg" mb={4}>Your Address</Heading>
                    <Text><strong>Address Name:</strong> {logged.address.addressName}</Text>
                    <Text><strong>Country:</strong> {logged.address.country}</Text>
                    <Text><strong>City:</strong> {logged.address.city}</Text>
                    <Text><strong>Street:</strong> {logged.address.street}</Text>
                    <Text><strong>Apartment Floor:</strong> {logged.address.apartmentFloor || 'N/A'}</Text>
                    <Text><strong>Apartment Number:</strong> {logged.address.apartmentNumber || 'N/A'}</Text>
                    <Button mt={4} colorScheme="teal" onClick={() => setShowUpdateForm(true)}>
                        Update Address
                    </Button>
                </>
            )}
            {showUpdateForm && (
                <form onSubmit={handleSubmit}>
                    <FormControl mb={4}>
                        <FormLabel>Address Name</FormLabel>
                        <Select
                            value={selectedAddressName}
                            onChange={handleAddressNameChange}
                            options={addressNameOptions}
                            placeholder="Select an address type"
                        />
                    </FormControl>
                    <FormControl mb={4}>
                        <FormLabel>Country</FormLabel>
                        <Select
                            value={selectedCountry}
                            onChange={handleCountryChange}
                            options={countryOptions}
                            placeholder="Select a country"
                        />
                    </FormControl>
                    <FormControl mb={4}>
                        <FormLabel>City</FormLabel>
                        <Input
                            type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            placeholder="Enter city"
                        />
                    </FormControl>
                    <FormControl mb={4}>
                        <FormLabel>Street</FormLabel>
                        <Input
                            type="text"
                            value={street}
                            onChange={(e) => setStreet(e.target.value)}
                            placeholder="Enter street"
                        />
                    </FormControl>
                    <FormControl mb={4}>
                        <FormLabel>Apartment Floor (Optional)</FormLabel>
                        <Input
                            type="text"
                            value={apartmentFloor}
                            onChange={(e) => setApartmentFloor(e.target.value)}
                            placeholder="Enter apartment floor"
                        />
                    </FormControl>
                    <FormControl mb={4}>
                        <FormLabel>Apartment Number (Optional)</FormLabel>
                        <Input
                            type="text"
                            value={apartmentNumber}
                            onChange={(e) => setApartmentNumber(e.target.value)}
                            placeholder="Enter apartment number"
                        />
                    </FormControl>
                    <Button type="submit" colorScheme="teal">
                        Submit
                    </Button>
                    <Button ml={4} onClick={() => setShowUpdateForm(false)}>
                        Cancel
                    </Button>
                </form>
            )}
        </Box>
    );
};

export default Address;
