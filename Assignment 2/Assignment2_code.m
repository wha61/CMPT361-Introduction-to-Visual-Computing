%1: Take 4 sets of 2 photographs to be stitched together to create a panorama
S1_im1 = imread('S1-im1.png');
S1_im1_grey = rgb2gray(S1_im1);
S1_im2 = imread('S1-im2.png');
S1_im2_grey = rgb2gray(S1_im2);
S2_im1 = imread('S2-im1.png');
S2_im1_grey = rgb2gray(S2_im1);
S2_im2 = imread('S2-im2.png');
S2_im2_grey = rgb2gray(S2_im2);
S3_im1 = imread('S3-im1.png');
S3_im1_grey = rgb2gray(S3_im1);
S3_im2 = imread('S3-im2.png');
S3_im2_grey = rgb2gray(S3_im2);
S4_im1 = imread('S4-im1.png');
S4_im1_grey = rgb2gray(S4_im1);
S4_im2 = imread('S4-im2.png');
S4_im2_grey = rgb2gray(S4_im2);

%2: FAST feature detector, my_fast_detector funtion defined in my_fast_detector.m
%Save the visualization of the detected points in the first images of your 2 image sets as S1-fast.png and S2-fast.png
fastfeaturepoints_S1_im1 = my_fast_detector(S1_im1, 30);
imshow(S1_im1);
hold on;
plot(fastfeaturepoints_S1_im1(:, 1), fastfeaturepoints_S1_im1(:, 2), 'g.');
f = getframe; 
imwrite(f.cdata,'S1-fast.png');

fastfeaturepoints_S2_im1 = my_fast_detector(S2_im1, 30);
imshow(S2_im1);
hold on;
plot(fastfeaturepoints_S2_im1(:, 1), fastfeaturepoints_S2_im1(:, 2), 'g.');
f = getframe; 
imwrite(f.cdata,'S2-fast.png');

%2: Robust FAST using Harris Cornerness metric 
%here I implement Harris cornerness measure by define a fucntion called my_faster_detector in faster.m  
harrisfeaturepoints_S1_im1 = my_faster_detector(S1_im1, 0.01);
imshow(S1_im1);
hold on;
plot(harrisfeaturepoints_S1_im1(:, 1), harrisfeaturepoints_S1_im1(:, 2), 'g.');
f = getframe; 
imwrite(f.cdata,'S1-fastR.png');

harrisfeaturepoints_S2_im1 = my_faster_detector(S2_im1, 0.01);
imshow(S2_im1);
hold on;
plot(harrisfeaturepoints_S2_im1(:, 1), harrisfeaturepoints_S2_im1(:, 2), 'g.');
f = getframe; 
imwrite(f.cdata,'S2-fastR.png');

%3&4: Point description and matching + RANSAC and Panoramas
%here I use SURF feature decription methods to generate descriptors

%using FAST points
%S1-fastMatch
imgs_s1 = [S1_im1,S1_im2];
imshow(imgs_s1);

fastfeaturepoints_S1_im1 = my_fast_detector(S1_im1, 30);
imshow(S1_im1);
hold on;
plot(fastfeaturepoints_S1_im1(:, 1), fastfeaturepoints_S1_im1(:, 2), 'g.');

fastfeaturepoints_S1_im2 = my_fast_detector(S1_im2, 30);
imshow(S1_im2);
hold on;
plot(fastfeaturepoints_S1_im2(:, 1), fastfeaturepoints_S1_im2(:, 2), 'g.');

[S1_im1_fast_Features, S1vpts1] = extractFeatures(S1_im1_grey, fastfeaturepoints_S1_im1);
[S1_im2_fast_Features, S1vpts2] = extractFeatures(S1_im2_grey, fastfeaturepoints_S1_im2);
S1_fast_Pairs = matchFeatures(S1_im1_fast_Features, S1_im2_fast_Features,'Unique', true);

matchedimg_S1_im1_Points = S1vpts1(S1_fast_Pairs(:, 1), :);
matchedimg_S1_im2_Points = S1vpts2(S1_fast_Pairs(:, 2), :);
showMatchedFeatures(S1_im1, S1_im2, matchedimg_S1_im1_Points, matchedimg_S1_im2_Points, 'montage');

[tformsS1, inlierimg_S1_im2_points, inlierimg_S1_im1_points] = estimateGeometricTransform(matchedimg_S1_im2_Points, matchedimg_S1_im1_Points, 'projective','Confidence', 99.9, 'MaxNumTrials', 1500, 'MaxDistance', 10);

figure;
showMatchedFeatures(S1_im1, S1_im2, inlierimg_S1_im1_points, inlierimg_S1_im2_points, 'montage');
f = getframe; 
imwrite(f.cdata,'S1-fastMatch.png');

%using FAST points
%S2-fastMatch
imgs_s2 = [S2_im1,S2_im2];
imshow(imgs_s2);

fastfeaturepoints_S2_im1 = my_fast_detector(S2_im1, 30);
imshow(S2_im1);
hold on;
plot(fastfeaturepoints_S2_im1(:, 1), fastfeaturepoints_S2_im1(:, 2), 'g.');

fastfeaturepoints_S2_im2 = my_fast_detector(S2_im2, 30);
imshow(S2_im2);
hold on;
plot(fastfeaturepoints_S2_im2(:, 1), fastfeaturepoints_S2_im2(:, 2), 'g.');

[S2_im1_fast_Features, S2vpts1] = extractFeatures(S2_im1_grey, fastfeaturepoints_S2_im1);
[S2_im2_fast_Features, S2vpts2] = extractFeatures(S2_im2_grey, fastfeaturepoints_S2_im2);
S2_fast_Pairs = matchFeatures(S2_im1_fast_Features, S2_im2_fast_Features,'Unique', true);

matchedimg_S2_im1_Points = S2vpts1(S2_fast_Pairs(:, 1), :);
matchedimg_S2_im2_Points = S2vpts2(S2_fast_Pairs(:, 2), :);
showMatchedFeatures(S2_im1, S2_im2, matchedimg_S2_im1_Points, matchedimg_S2_im2_Points, 'montage');

[tformS2, inlierimg_S2_im2_points, inlierimg_S2_im1_points] = estimateGeometricTransform(matchedimg_S2_im2_Points, matchedimg_S2_im1_Points, 'projective','Confidence', 99.9, 'MaxNumTrials', 1500, 'MaxDistance', 10);
figure;
showMatchedFeatures(S2_im1, S2_im2, inlierimg_S2_im1_points, inlierimg_S2_im2_points, 'montage');
f = getframe; 
imwrite(f.cdata,'S2-fastMatch.png');

%using FASTR points
%S1-fastRMatch
imgs_s1 = [S1_im1,S1_im2];
imshow(imgs_s1);

harrisfeaturepoints_S1_im1 = my_faster_detector(S1_im1, 0.01);
imshow(S1_im1);
hold on;
plot(harrisfeaturepoints_S1_im1(:, 1), harrisfeaturepoints_S1_im1(:, 2), 'g.');

harrisfeaturepoints_S1_im2 = my_faster_detector(S1_im2, 0.01);
imshow(S1_im2);
hold on;
plot(harrisfeaturepoints_S1_im2(:, 1), harrisfeaturepoints_S1_im2(:, 2), 'g.');

[S1_im1_fastR_Features, S1vpts1R] = extractFeatures(S1_im1_grey, harrisfeaturepoints_S1_im1);
[S1_im2_fastR_Features, S1vpts2R] = extractFeatures(S1_im2_grey, harrisfeaturepoints_S1_im2);
S1_fastR_Pairs = matchFeatures(S1_im1_fastR_Features, S1_im2_fastR_Features,'Unique', true);

matchedimg_S1_im1_PointsR = S1vpts1R(S1_fastR_Pairs(:, 1), :);
matchedimg_S1_im2_PointsR = S1vpts2R(S1_fastR_Pairs(:, 2), :);
showMatchedFeatures(S1_im1, S1_im2, matchedimg_S1_im1_PointsR, matchedimg_S1_im2_PointsR, 'montage');

[tformS1R, inlierimg_S1_im2_pointsR, inlierimg_S1_im1_pointsR] = estimateGeometricTransform(matchedimg_S1_im2_PointsR, matchedimg_S1_im1_PointsR, 'projective','Confidence', 99.9, 'MaxNumTrials', 2000, 'MaxDistance',1.5);
figure;
showMatchedFeatures(S1_im1, S1_im2, inlierimg_S1_im1_pointsR, inlierimg_S1_im2_pointsR, 'montage');
f = getframe; 
imwrite(f.cdata,'S1-fastRMatch.png');

%using FASTR points
%S2-fastRMatch
imgs_s2 = [S2_im1,S2_im2];
imshow(imgs_s2);

harrisfeaturepoints_S2_im1 = my_faster_detector(S2_im1, 0.01);
imshow(S2_im1);
hold on;
plot(harrisfeaturepoints_S2_im1(:, 1), harrisfeaturepoints_S2_im1(:, 2), 'g.');

harrisfeaturepoints_S2_im2 = my_faster_detector(S2_im2, 0.01);
imshow(S2_im2);
hold on;
plot(harrisfeaturepoints_S2_im2(:, 1), harrisfeaturepoints_S2_im2(:, 2), 'g.');

[S2_im1_fastR_Features, S2vpts1R] = extractFeatures(S2_im1_grey, harrisfeaturepoints_S2_im1);
[S2_im2_fastR_Features, S2vpts2R] = extractFeatures(S2_im2_grey, harrisfeaturepoints_S2_im2);
S2_fastR_Pairs = matchFeatures(S2_im1_fastR_Features, S2_im2_fastR_Features,'Unique', true);

matchedimg_S2_im1_PointsR = S2vpts1R(S2_fastR_Pairs(:, 1), :);
matchedimg_S2_im2_PointsR = S2vpts2R(S2_fastR_Pairs(:, 2), :);
showMatchedFeatures(S2_im1, S2_im2, matchedimg_S2_im1_PointsR, matchedimg_S2_im2_PointsR, 'montage');

[tformS2R, inlierimg_S2_im2_pointsR, inlierimg_S2_im1_pointsR] = estimateGeometricTransform(matchedimg_S2_im2_PointsR, matchedimg_S2_im1_PointsR, 'projective','Confidence', 99.9, 'MaxNumTrials',2000, 'MaxDistance', 1.5);
figure;
showMatchedFeatures(S2_im1, S2_im2, inlierimg_S2_im1_pointsR, inlierimg_S2_im2_pointsR, 'montage');
f = getframe; 
imwrite(f.cdata,'S2-fastRMatch.png');

imageSize=size(S1_im1); 
[xlimS1R, ylimS1R] = outputLimits(tformS1R, [1 imageSize(2)], [1 imageSize(1)]);
xMinS1R = min([1; xlimS1R(:)]);
xMaxS1R = max([imageSize(2); xlimS1R(:)]);

yMinS1R = min([1; ylimS1R(:)]);
yMaxS1R = max([imageSize(1); ylimS1R(:)]);

widthS1R = round(xMaxS1R - xMinS1R);
heightS1R = round(yMaxS1R - yMinS1R);

xLimitsS1R = [xMinS1R xMaxS1R];
yLimitsS1R = [yMinS1R yMaxS1R];
panoramaViewS1R = imref2d([heightS1R widthS1R], xLimitsS1R, yLimitsS1R);

unwarpedImageS1R = imwarp(S1_im1,projective2d(eye(3)), 'OutputView', panoramaViewS1R);
warpedImageS1R = imwarp(S1_im1, tformS1R, 'OutputView', panoramaViewS1R);
 
Rfixed = imref2d(size(S1_im1));
[registered2, Rregistered] = imwarp(S1_im2, tformS1R);
imshowpair(S1_im1,Rfixed,registered2,Rregistered,'blend');
f = getframe; 
imwrite(f.cdata,'S1-panorama.png');

imageSize=size(S2_im1); 
[xlimS2R, ylimS2R] = outputLimits(tformS2R, [1 imageSize(2)], [1 imageSize(1)]);
xMinS2R = min([1; xlimS2R(:)]);
xMaxS2R = max([imageSize(2); xlimS2R(:)]);

yMinS2R = min([1; ylimS2R(:)]);
yMaxS2R = max([imageSize(1); ylimS2R(:)]);

widthS2R = round(xMaxS2R - xMinS2R);
heightS2R = round(yMaxS2R - yMinS2R);

xLimitsS2R = [xMinS2R xMaxS2R];
yLimitsS2R = [yMinS2R yMaxS2R];
panoramaViewS2R = imref2d([heightS2R widthS2R], xLimitsS2R, yLimitsS2R);

unwarpedImageS2R = imwarp(S2_im1,projective2d(eye(3)), 'OutputView', panoramaViewS2R);
warpedImageS2R = imwarp(S2_im1, tformS2R, 'OutputView', panoramaViewS2R);

Rfixed = imref2d(size(S2_im1));
[registered2, Rregistered] = imwarp(S2_im2, tformS2R);
imshowpair(S2_im1,Rfixed,registered2,Rregistered,'blend');
f = getframe; 
imwrite(f.cdata,'S2-panorama.png');

%S3-panorama and S4-panorama
%using FASTR points
%S3-fastRMatch
imgs_s3 = [S3_im1,S3_im2];
imshow(imgs_s3);

harrisfeaturepoints_S3_im1 = my_faster_detector(S3_im1, 0.01);
imshow(S3_im1);
hold on;
plot(harrisfeaturepoints_S3_im1(:, 1), harrisfeaturepoints_S3_im1(:, 2), 'g.');

harrisfeaturepoints_S3_im2 = my_faster_detector(S3_im2, 0.01);
imshow(S3_im2);
hold on;
plot(harrisfeaturepoints_S3_im2(:, 1), harrisfeaturepoints_S3_im2(:, 2), 'g.');

[S3_im1_fastR_Features, S3vpts1R] = extractFeatures(S3_im1_grey, harrisfeaturepoints_S3_im1);
[S3_im2_fastR_Features, S3vpts2R] = extractFeatures(S3_im2_grey, harrisfeaturepoints_S3_im2);
S3_fastR_Pairs = matchFeatures(S3_im1_fastR_Features, S3_im2_fastR_Features,'Unique', true);

matchedimg_S3_im1_PointsR = S3vpts1R(S3_fastR_Pairs(:, 1), :);
matchedimg_S3_im2_PointsR = S3vpts2R(S3_fastR_Pairs(:, 2), :);
showMatchedFeatures(S3_im1, S3_im2, matchedimg_S3_im1_PointsR, matchedimg_S3_im2_PointsR, 'montage');

[tformS3R, inlierimg_S3_im2_pointsR, inlierimg_S3_im1_pointsR] = estimateGeometricTransform(matchedimg_S3_im2_PointsR, matchedimg_S3_im1_PointsR, 'projective','Confidence', 99.9, 'MaxNumTrials', 2000, 'MaxDistance',1.5);
figure;
showMatchedFeatures(S3_im1, S3_im2, inlierimg_S3_im1_pointsR, inlierimg_S3_im2_pointsR, 'montage');

imageSize=size(S3_im1); 
[xlimS3R, ylimS3R] = outputLimits(tformS3R, [1 imageSize(2)], [1 imageSize(1)]);
xMinS3R = min([1; xlimS3R(:)]);
xMaxS3R = max([imageSize(2); xlimS3R(:)]);

yMinS3R = min([1; ylimS3R(:)]);
yMaxS3R = max([imageSize(1); ylimS3R(:)]);

widthS3R = round(xMaxS3R - xMinS3R);
heightS3R = round(yMaxS3R - yMinS3R);

xLimitsS3R = [xMinS3R xMaxS3R];
yLimitsS3R = [yMinS3R yMaxS3R];
panoramaViewS3R = imref2d([heightS3R widthS3R], xLimitsS3R, yLimitsS3R);

unwarpedImageS3R = imwarp(S3_im1,projective2d(eye(3)), 'OutputView', panoramaViewS3R);
warpedImageS3R = imwarp(S3_im1, tformS3R, 'OutputView', panoramaViewS3R);

Rfixed = imref2d(size(S3_im1));
[registered2, Rregistered] = imwarp(S3_im2, tformS3R);
imshowpair(S3_im1,Rfixed,registered2,Rregistered,'blend');
f = getframe; 
imwrite(f.cdata,'S3-panorama.png');


%using FASTR points
%S2-fastRMatch
imgs_s4 = [S4_im1,S4_im2];
imshow(imgs_s4);

harrisfeaturepoints_S4_im1 = my_faster_detector(S4_im1, 0.01);
imshow(S4_im1);
hold on;
plot(harrisfeaturepoints_S4_im1(:, 1), harrisfeaturepoints_S4_im1(:, 2), 'g.');

harrisfeaturepoints_S4_im2 = my_faster_detector(S4_im2, 0.01);
imshow(S4_im2);
hold on;
plot(harrisfeaturepoints_S4_im2(:, 1), harrisfeaturepoints_S4_im2(:, 2), 'g.');

[S4_im1_fastR_Features, S4vpts1R] = extractFeatures(S4_im1_grey, harrisfeaturepoints_S4_im1);
[S4_im2_fastR_Features, S4vpts2R] = extractFeatures(S4_im2_grey, harrisfeaturepoints_S4_im2);
S4_fastR_Pairs = matchFeatures(S4_im1_fastR_Features, S4_im2_fastR_Features,'Unique', true);

matchedimg_S4_im1_PointsR = S4vpts1R(S4_fastR_Pairs(:, 1), :);
matchedimg_S4_im2_PointsR = S4vpts2R(S4_fastR_Pairs(:, 2), :);
showMatchedFeatures(S4_im1, S4_im2, matchedimg_S4_im1_PointsR, matchedimg_S4_im2_PointsR, 'montage');

[tformS4R, inlierimg_S4_im2_pointsR, inlierimg_S4_im1_pointsR] = estimateGeometricTransform(matchedimg_S4_im2_PointsR, matchedimg_S4_im1_PointsR, 'projective','Confidence', 99.9, 'MaxNumTrials', 2000, 'MaxDistance',10);
figure;
showMatchedFeatures(S4_im1, S4_im2, inlierimg_S4_im1_pointsR, inlierimg_S4_im2_pointsR, 'montage');

imageSize=size(S4_im1); 
[xlimS4R, ylimS4R] = outputLimits(tformS4R, [1 imageSize(2)], [1 imageSize(1)]);
xMinS4R = min([1; xlimS4R(:)]);
xMaxS4R = max([imageSize(2); xlimS4R(:)]);

yMinS4R = min([1; ylimS4R(:)]);
yMaxS4R = max([imageSize(1); ylimS4R(:)]);

widthS4R = round(xMaxS4R - xMinS4R);
heightS4R = round(yMaxS4R - yMinS4R);

xLimitsS4R = [xMinS4R xMaxS4R];
yLimitsS4R = [yMinS4R yMaxS4R];
panoramaViewS4R = imref2d([heightS4R widthS4R], xLimitsS4R, yLimitsS4R);

unwarpedImageS4R = imwarp(S4_im1,projective2d(eye(3)), 'OutputView', panoramaViewS4R);
warpedImageS4R = imwarp(S4_im1, tformS4R, 'OutputView', panoramaViewS4R);

Rfixed = imref2d(size(S4_im1));
[registered2, Rregistered] = imwarp(S4_im2, tformS4R);
imshowpair(S4_im1,Rfixed,registered2,Rregistered,'blend');
f = getframe; 
imwrite(f.cdata,'S4-panorama.png');

