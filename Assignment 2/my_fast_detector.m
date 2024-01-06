function fastfeaturepoints = my_fast_detector(image, threshold)%define function in matlab

img =  rgb2gray(image);
imshow(img);
t = threshold;
fastfeaturepoints = [];%an empty container to hold the fastfeature points
hold on;

tic; 
for i = 1+3:750 - 3  %go through the pixel from lefttop of figure
    for j = 1+3:700 - 3
        centralpixel = img(i,j);%Ip
        p1 = img(i-3,j);
        p2 = img(i-3,j+1);
        p3 = img(i-2,j+2);
        p4 = img(i-1,j+3);
        p5 = img(i,j+3);
        p6 = img(i+1,j+3);
        p7 = img(i+2,j+2);
        p8 = img(i+3,j+1);
        p9 = img(i+3,j);
        p10 = img(i+3,j-1);
        p11 = img(i+2,j-2);
        p12 = img(i+1,j-3);
        p13= img(i,j-3);
        p14 = img(i-1,j-3);
        p15 = img(i-2,j-2);
        p16 = img(i-3,j-1);%pixels that form circle(1~16)
        circlepixel = [p1 p2 p3 p4 p5 p6 p7 p8 p9 p10 p11 p12 p13 p14 p15 p16];
        bool_1_brighter = p1>centralpixel+t;%Ip+t
        bool_9_brighter = p9>centralpixel+t;
        bool_5_brighter = p5>centralpixel+t;  
        bool_13_brighter = p13>centralpixel+t;%if >, then bool equal to 1 
        if sum([bool_1_brighter bool_9_brighter bool_5_brighter bool_13_brighter]) >= 3%at leat 3, high speed test
            ind = find(circlepixel-centralpixel>t);
            if length(ind) >= 12 
                fastfeaturepoints = [fastfeaturepoints;[j,i]];%use container to collect points, N*2 matrix
            end    
        end   
        bool_1_darker = p1<centralpixel-t;%Ip-t
        bool_9_darker = p9<centralpixel-t;
        bool_5_darker = p5<centralpixel-t;  
        bool_13_darker = p13<centralpixel-t;%if >, then bool equal to 1  
        if sum([bool_1_darker bool_9_darker bool_5_darker bool_13_darker]) >= 3%at leat 3, high speed test
            ind = find(circlepixel-centralpixel<-t);
            if length(ind) >= 12
                fastfeaturepoints = [fastfeaturepoints;[j,i]];%use container to collect points, N*2 matrix
            end    
        end   
    end  
end  
toc;%record time of fast feature detector


