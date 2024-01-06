function harrisfeaturepoints= my_faster_detector(image,threshold)

c1 = im2gray(im2double(image));
tic;
sobel = [-1 0 1; -2 0 2; -1 0 1];

gaus = fspecial('gaussian', 5, 1);
dog = conv2(gaus,sobel);
ix = imfilter(c1,dog);
iy = imfilter(c1,dog');
ix2g = imfilter(ix .* ix, gaus);
iy2g = imfilter(iy .* iy, gaus);
ixiyg = imfilter(ix .* iy, gaus);
harcor = ix2g .* iy2g - ixiyg .* ixiyg - 0.05 * (ix2g + iy2g).^2 ;

localmax = imdilate(harcor,ones(3));
coners = (harcor == localmax) .* (harcor > threshold);

harrisfeaturepoints = [];%an empty container to hold the harrisfeature points

for i = 1:750
       for j = 1:700
           if coners(i,j) == 1
               harrisfeaturepoints = [harrisfeaturepoints;[j,i]];%use container to collect points, N*2 matrix
           end
       end
end
toc;%record time of harris feature detector
