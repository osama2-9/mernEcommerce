/* eslint-disable react/prop-types */
import { Button, Flex, Menu, MenuButton, MenuList, MenuItem, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useState } from "react";
import useGetBrands from "../hooks/useGetBrands";

const CategoreisWithBrands = ({ categories }) => {
    const { brands } = useGetBrands();
    const [openMenu, setOpenMenu] = useState(null);

    return (
        <Flex gap={3} justify="center" bg="gray.100" py={5}>
            {categories?.map((category) => (
                <Menu
                    key={category.categoryName}
                    isOpen={openMenu === category.categoryName}
                >
                    <MenuButton
                        as={Button}
                        variant="link"
                        mx={2}
                        fontSize="sm"
                        onMouseEnter={() => setOpenMenu(category.categoryName)}
                        onMouseLeave={() => setOpenMenu(null)}
                        _hover={{ textDecoration: 'none' }}
                    >
                        {category.categoryName}
                    </MenuButton>
                    <MenuList
                        width={'300px'}
                        onMouseEnter={() => setOpenMenu(category.categoryName)}
                        onMouseLeave={() => setOpenMenu(null)}
                    >
                        {brands
                            ?.filter(brand => brand.brandFor.includes(category._id))
                            ?.map((brand) => (
                                <Link key={brand._id} to={`/brand/${brand._id}`}>
                                    <MenuItem>
                                        <Image
                                            src={brand.brandImg}
                                            alt={brand.brandName}
                                            boxSize="2rem"
                                            borderRadius="full"
                                            mr="12px"
                                        />
                                        {brand.brandName}
                                    </MenuItem>
                                </Link>
                            ))}
                    </MenuList>
                </Menu>
            ))}
        </Flex>
    );
};

export default CategoreisWithBrands;
