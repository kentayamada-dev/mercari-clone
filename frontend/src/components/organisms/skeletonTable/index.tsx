import { Center, SimpleGrid, Skeleton } from "native-base";
import React from "react";
import { useWindowDimensions } from "react-native";
import { SkeletonTableProps } from "./types";

export const SkeletonTable: React.VFC<SkeletonTableProps> =
  React.memo<SkeletonTableProps>(({ numbers }) => {
    const { width } = useWindowDimensions();

    return (
      <Center>
        <SimpleGrid columns={3} space={1}>
          {[...Array(numbers)].map((_, index) => (
            <Skeleton
              key={index}
              width={width / 3.1}
              height={width / 3.1}
              borderRadius="md"
            />
          ))}
        </SimpleGrid>
      </Center>
    );
  });
