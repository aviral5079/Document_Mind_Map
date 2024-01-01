import React, { memo, useState } from "react";
import { Handle, Position } from "reactflow";
import {
  CircularProgress,
  CircularProgressLabel,
  Icon,
  Heading,
  Text,
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Tooltip,
  Button,
  Stack,
  Textarea,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { BiExpandAlt, BiCollapseAlt } from "react-icons/bi";
import { IoDocumentTextOutline } from "react-icons/io5";
import { RiParentFill } from "react-icons/ri";
import { TiFlowChildren } from "react-icons/ti";
import "../styles/treeNode.css";

const handleStyle = {
  borderRadius: "4px",
  border: "1px solid #23272a",
  backgroundColor: "#3F72AF",
};

export default memo(({ data, isConnectable }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [expand, setExpand] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showTooltip, setShowTooltip] = useState(false);
  const [textAreaValue, setTextAreaValue] = useState("");

  let handlePosition = "horizontal";

  const calcHandlePosition = (angle) => {
    if (angle <= 45 || angle >= 315) {
      return Position.Left;
    } else if (angle > 45 && angle <= 135) {
      handlePosition = "vertical";
      return Position.Top;
    } else if (angle > 135 && angle <= 225) {
      return Position.Right;
    } else if (angle > 225 && angle < 315) {
      handlePosition = "vertical";
      return Position.Bottom;
    }
  };

  calcHandlePosition(data.firstChildPostionAngle);

  return (
    <div className="treeNode">
      <div className="treeNode-header">
        <CircularProgress value={progress} color="green.400" size="30px">
          <CircularProgressLabel color="#23272a">
            {progress}%
          </CircularProgressLabel>
        </CircularProgress>
        <div
          className="treeNode-header__title"
          onClick={() => {
            data.handleCoordinates({ x: data.position.x, y: data.position.y });
            setShowDetails(!showDetails);
          }}
        >
          <Heading as="h4" size="md" color="#23272a">
            {data.label}
          </Heading>
        </div>
        {expand ? (
          <Icon
            as={BiExpandAlt}
            boxSize={4}
            color="#23272a"
            cursor="pointer"
            onClick={() => {
              const newValue = !expand;
              setExpand(newValue);
              data.handleClick({ id: data.key, shouldHide: newValue });
            }}
          />
        ) : (
          <Icon
            as={BiCollapseAlt}
            boxSize={4}
            color="#23272a"
            cursor="pointer"
            onClick={() => {
              const newValue = !expand;
              setExpand(newValue);
              data.handleClick({ id: data.key, shouldHide: newValue });
            }}
          />
        )}
      </div>
      {showDetails && (
        <div className="treeNode-body">
          <Stack direction="column" spacing={2}>
            <Text fontSize="sm" color="#23272a">
              {data.summary}
            </Text>
            {Object.entries(data.info)?.map(([key, value]) => (
              <Text
                key={key}
                fontSize="sm"
                color="#23272a"
              >{`${key}: ${value}`}</Text>
            ))}
          </Stack>
        </div>
      )}

      {showDetails && (
        <div className="treeNode-footer">
          <Accordion allowToggle>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="right">
                    <AccordionIcon color="#23272a" />
                  </Box>
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4} color="#23272a">
                <Grid
                  templateAreas={`"docButton ColorPicker"
                  "parentButton childrenButton"
                  "textArea textArea"
                  "slider slider"`}
                  align="center"
                  gap="2"
                >
                  <GridItem pl="2" area={"docButton"}>
                    <Button
                      leftIcon={<IoDocumentTextOutline />}
                      color="#3F72AF"
                      variant="outline"
                    >
                      Go to Document
                    </Button>
                  </GridItem>
                  <GridItem pl="2" area={"ColorPicker"}>
                    <Button color="#3F72AF" variant="outline">
                      Related Nodes
                    </Button>
                  </GridItem>
                  <GridItem pl="2" area={"parentButton"}>
                    <Button
                      leftIcon={<RiParentFill />}
                      color="#3F72AF"
                      variant="outline"
                      onClick={() => {
                        data.handleSelected({
                          id: data.key,
                          selectParent: true,
                          selectChild: false,
                        });

                        const parentX =
                          data.position.x -
                          data.parentRadialDistance *
                            Math.cos((data.positionAngle * Math.PI) / 180);
                        const parentY =
                          data.position.y -
                          data.parentRadialDistance *
                            Math.sin((data.positionAngle * Math.PI) / 180);
                        // console.log(`parent: ${parentX} ${parentY}`);

                        data.handleCoordinates({ x: parentX, y: parentY });
                      }}
                    >
                      Parent Node
                    </Button>
                  </GridItem>
                  <GridItem pl="2" area={"childrenButton"}>
                    <Button
                      leftIcon={<TiFlowChildren />}
                      color="#3F72AF"
                      variant="outline"
                      onClick={() => {
                        data.handleSelected({
                          id: data.key,
                          selectParent: false,
                          selectChild: true,
                        });

                        const childX =
                          data.position.x +
                          data.childRadialDistance *
                            Math.cos((data.positionAngle * Math.PI) / 180);
                        const childY =
                          data.position.y +
                          data.childRadialDistance *
                            Math.sin((data.positionAngle * Math.PI) / 180);
                        // console.log(`child: ${childX} ${childY}`);

                        data.handleCoordinates({ x: childX, y: childY });
                      }}
                    >
                      Child Nodes
                    </Button>
                  </GridItem>
                  <GridItem pl="2" area={"textArea"}>
                    <Textarea
                      value={textAreaValue}
                      onChange={(e) => {
                        const value = e.target.value;
                        setTextAreaValue(value);
                      }}
                      placeholder="Write key notes"
                      size="sm"
                      resize="none"
                    />
                  </GridItem>
                  <GridItem pl="2" area={"slider"}>
                    <Slider
                      id="slider"
                      defaultValue={progress}
                      min={0}
                      max={100}
                      colorScheme="#23272a"
                      onChange={(v) => setProgress(v)}
                      onMouseEnter={() => setShowTooltip(true)}
                      onMouseLeave={() => setShowTooltip(false)}
                    >
                      <SliderTrack>
                        <SliderFilledTrack />
                      </SliderTrack>
                      <Tooltip
                        hasArrow
                        bg="#DBE2EF"
                        color="#23272a"
                        placement="top"
                        isOpen={showTooltip}
                        label={`${progress}%`}
                      >
                        <SliderThumb />
                      </Tooltip>
                    </Slider>
                  </GridItem>
                </Grid>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </div>
      )}

      <Handle
        type={data.key === "0" ? "source" : "target"}
        position={calcHandlePosition(data.firstChildPositionAngle)}
        id="a"
        isConnectable={isConnectable}
        style={{
          ...handleStyle,
          [handlePosition === "vertical" ? "width" : "height"]: showDetails
            ? "25px"
            : "15px",
        }}
      />
      <Handle
        type="source"
        position={calcHandlePosition(
          (data.firstChildPositionAngle + 180) % 360
        )}
        id="b"
        isConnectable={isConnectable}
        style={{
          ...handleStyle,
          [handlePosition === "vertical" ? "width" : "height"]: showDetails
            ? "25px"
            : "15px",
        }}
      />
    </div>
  );
});
