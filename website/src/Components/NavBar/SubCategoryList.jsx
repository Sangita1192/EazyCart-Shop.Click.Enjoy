import React from 'react'
import { Button, List, ListItem } from "@mui/material"

export const SubCategoryList = ({ parentId, subCategories, expandedCats, setExpandedCats, fetchSubCategories }) => {
    const children = subCategories[parentId] || []

    return (
        <List className="!w-[90%] !ml-auto !p-0">
            {children.map((sub) => (
                <ListItem disablePadding key={sub._id} className="!block">
                    <Button
                        className="!w-full !p-[10px] !px-[15px] !flex !justify-between !items-center"
                        onClick={() => fetchSubCategories(sub._id)}
                    >
                        <p className="!text-black-600">{sub.name}</p>
                    </Button>

                    {/* If this subcategory is expanded, render its children recursively */}
                    {expandedCats.includes(sub._id) && (
                        <SubCategoryList
                            parentId={sub._id}
                            subCategories={subCategories}
                            expandedCats={expandedCats}
                            setExpandedCats={setExpandedCats}
                            fetchSubCategories={fetchSubCategories}
                        />
                    )}
                </ListItem>
            ))}
        </List>
    )
}
